from django.views.generic import TemplateView, DetailView
from django.shortcuts import render, get_object_or_404, redirect, reverse
from django.contrib import messages
from datetime import date, timedelta
from .models import Car, Booking, ContactInquiry, SiteSetting, PaymentMethod, Statistic, TeamMember, PageContent
from .forms import BookingForm, ContactForm
from .utils import send_invoice_email
from django.utils import timezone

# Create your views here.

class HomeView(TemplateView):
    template_name = 'pages/index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['featured_cars'] = Car.objects.filter(available=True, featured=True)[:6]
        # Site settings
        try:
            context['site_settings'] = SiteSetting.objects.first()
        except SiteSetting.DoesNotExist:
            context['site_settings'] = None
        # Payment methods
        context['payment_methods'] = PaymentMethod.objects.filter(is_active=True).order_by('order')
        # Statistics
        context['statistics'] = Statistic.objects.filter(is_active=True).order_by('order')
        return context

class AboutView(TemplateView):
    template_name = 'pages/about.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['team_members'] = TeamMember.objects.filter(is_active=True).order_by('order')
        return context

class FleetView(TemplateView):
    template_name = 'pages/fleet.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['cars'] = Car.objects.filter(available=True)
        return context

class BookingView(TemplateView):
    template_name = 'pages/booking.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['cars'] = Car.objects.filter(available=True)
        context['booking_form'] = BookingForm()
        return context
    
    def post(self, request, *args, **kwargs):
        form = BookingForm(request.POST)
        if form.is_valid():
            # Get location data from separate POST fields
            pickup_location = f"{request.POST.get('pickup_division', '')}, {request.POST.get('pickup_district', '')}, {request.POST.get('pickup_upazila', '')}"
            dropoff_location = f"{request.POST.get('dropoff_division', '')}, {request.POST.get('dropoff_district', '')}, {request.POST.get('dropoff_upazila', '')}"
            
            car = form.cleaned_data['car']
            pickup_date = form.cleaned_data['pickup_date']
            dropoff_date = form.cleaned_data['dropoff_date']
            
            # Calculate days
            days = (dropoff_date - pickup_date).days + 1
            
            # Calculate total
            if days >= 30:
                daily_rate = car.price_monthly / 30
                discount = 0.20
            elif days >= 7:
                daily_rate = car.price_weekly / 7
                discount = 0.10
            else:
                daily_rate = car.price_daily
                discount = 0
            
            subtotal = daily_rate * days
            total = round(subtotal * (1 - discount))
            
            # Generate booking reference
            import random
            import string
            ref = 'RCBD-' + ''.join(random.choices(string.ascii_uppercase, k=3)) + '-' + str(random.randint(1000, 9999))
            
            # Save booking (mark as verified)
            booking = Booking.objects.create(
                car=car,
                customer_name=form.cleaned_data['customer_name'],
                customer_email=form.cleaned_data['customer_email'],
                customer_phone=form.cleaned_data['customer_phone'],
                nid_passport=form.cleaned_data['nid_passport'],
                pickup_date=pickup_date,
                dropoff_date=dropoff_date,
                pickup_location=pickup_location,
                dropoff_location=dropoff_location,
                rental_days=days,
                daily_rate=daily_rate,
                subtotal=subtotal,
                discount=discount,
                total=total,
                booking_reference=ref,
                email_verified=True,  # Auto-verify since we send email directly
                notes=form.cleaned_data.get('notes', '')
            )
            
            # Send invoice email with PDF (non-blocking)
            from .utils import send_invoice_email
            email_sent = send_invoice_email(booking)
            
            if email_sent:
                messages.success(request, f'Booking confirmed! Your invoice has been sent to {booking.customer_email}.')
            else:
                messages.warning(request, f'Booking confirmed! However, invoice email failed. You can view/download invoice using reference: {ref}.')
            
            # Redirect to success page
            return redirect(f"{reverse('pages:booking_success')}?ref={ref}")
        
        context = self.get_context_data()
        context['booking_form'] = form
        return self.render_to_response(context)

class BookingSuccessView(TemplateView):
    template_name = 'pages/booking_success.html'
    
    def get(self, request, *args, **kwargs):
        ref = request.GET.get('ref')
        if ref:
            try:
                booking = Booking.objects.get(booking_reference=ref)
                # No email verification check needed anymore
            except Booking.DoesNotExist:
                pass
        return super().get(request, *args, **kwargs)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        ref = self.request.GET.get('ref') or self.request.session.get('last_booking_ref')
        if ref:
            try:
                booking = Booking.objects.get(booking_reference=ref)
                context['booking'] = booking
            except Booking.DoesNotExist:
                pass
        return context


class VerifyEmailView(TemplateView):
    template_name = 'pages/verify_email.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        ref = self.request.GET.get('ref')
        if ref:
            try:
                booking = Booking.objects.get(booking_reference=ref)
                context['booking'] = booking
                # Check if OTP expired (10 minutes)
                if booking.otp_created_at:
                    from django.utils import timezone
                    expiry_time = booking.otp_created_at + timedelta(minutes=10)
                    context['otp_expired'] = timezone.now() > expiry_time
                else:
                    context['otp_expired'] = False
            except Booking.DoesNotExist:
                context['booking'] = None
        return context
    
    def post(self, request, *args, **kwargs):
        ref = request.POST.get('booking_ref')
        otp_entered = request.POST.get('otp')
        
        try:
            booking = Booking.objects.get(booking_reference=ref)
            
            # If no OTP set, redirect to resend
            if not booking.otp_code or not booking.otp_created_at:
                messages.error(request, 'Verification code not found. Please request a new code.')
                return redirect(f"{reverse('pages:resend_otp')}?ref={ref}")
            
            # Check if OTP expired
            expiry_time = booking.otp_created_at + timedelta(minutes=10)
            if timezone.now() > expiry_time:
                # Generate new OTP
                new_otp = generate_otp()
                booking.otp_code = new_otp
                booking.otp_created_at = timezone.now()
                booking.save()
                send_verification_email(booking)
                messages.warning(request, 'OTP expired. A new code has been sent to your email.')
                return redirect(f"{reverse('pages:verify_email')}?ref={ref}")
            
            if otp_entered == booking.otp_code:
                booking.email_verified = True
                booking.save()
                return redirect(f"{reverse('pages:booking_success')}?ref={ref}")
            else:
                messages.error(request, 'Invalid OTP. Please try again.')
                return redirect(f"{reverse('pages:verify_email')}?ref={ref}")
                
        except Booking.DoesNotExist:
            messages.error(request, 'Invalid booking reference.')
            return redirect('pages:home')


class ResendOTPView(TemplateView):
    """Resend OTP to customer email"""
    def get(self, request, *args, **kwargs):
        ref = request.GET.get('ref')
        try:
            booking = Booking.objects.get(booking_reference=ref)
            # Generate new OTP
            new_otp = generate_otp()
            booking.otp_code = new_otp
            booking.otp_created_at = timezone.now()
            booking.save()
            send_verification_email(booking)
            messages.success(request, 'A new verification code has been sent to your email.')
            return redirect(f"{reverse('pages:verify_email')}?ref={ref}")
        except Booking.DoesNotExist:
            messages.error(request, 'Invalid booking reference.')
            return redirect(reverse('pages:home'))


class ContactView(TemplateView):
    template_name = 'pages/contact.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['contact_form'] = ContactForm()
        return context
    
    def post(self, request, *args, **kwargs):
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save inquiry to database
            ContactInquiry.objects.create(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                phone=form.cleaned_data.get('phone', ''),
                subject=form.cleaned_data['subject'],
                message=form.cleaned_data['message']
            )
            
            messages.success(request, 'Your message has been sent successfully! We will contact you soon.')
            return redirect('pages:contact')
        
        context = self.get_context_data()
        context['contact_form'] = form
        return self.render_to_response(context)

class CarDetailsView(DetailView):
    template_name = 'pages/car-details.html'
    model = Car
    context_object_name = 'car'
    pk_url_kwarg = 'car_id'
    
    def get_queryset(self):
        return Car.objects.filter(available=True)

class TermsView(TemplateView):
    template_name = 'pages/terms.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            page_content = PageContent.objects.get(page_type='terms')
            context['page_content'] = page_content
        except PageContent.DoesNotExist:
            context['page_content'] = None
        return context

class PrivacyView(TemplateView):
    template_name = 'pages/privacy.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            page_content = PageContent.objects.get(page_type='privacy')
            context['page_content'] = page_content
        except PageContent.DoesNotExist:
            context['page_content'] = None
        return context

class InvoiceView(TemplateView):
    template_name = 'pages/invoice.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        ref = self.request.GET.get('ref')
        if ref:
            try:
                booking = Booking.objects.get(booking_reference=ref)
                # No email verification check - invoice always accessible
                context['booking'] = booking
            except Booking.DoesNotExist:
                context['booking'] = None
                context['error'] = 'Invalid booking reference.'
        else:
            context['booking'] = None
            context['error'] = 'Booking reference required.'
        return context

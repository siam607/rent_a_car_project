from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Q
from django.utils import timezone
from pages.models import Car, Booking, ContactInquiry, SiteSetting, Statistic, TeamMember, PageContent, PaymentMethod
from .forms import CarForm, SiteSettingForm, StatisticForm, TeamMemberForm, PageContentForm, PaymentMethodForm
from datetime import date


# ========== Authentication Views ==========

def admin_login(request):
    """Custom admin login view"""
    if request.user.is_authenticated:
        return redirect('admin_panel:dashboard')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            next_url = request.GET.get('next', 'admin_panel:dashboard')
            return redirect(next_url)
        else:
            messages.error(request, 'Invalid credentials or insufficient permissions.')
    
    return render(request, 'admin_panel/auth/login.html')


@login_required
def admin_logout(request):
    """Custom admin logout view"""
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('admin_panel:login')


# ========== Dashboard View ==========

@login_required
def dashboard(request):
    """Admin dashboard with overview statistics"""
    today = timezone.now().date()
    
    stats = {
        'total_cars': Car.objects.count(),
        'available_cars': Car.objects.filter(available=True).count(),
        'featured_cars': Car.objects.filter(featured=True).count(),
        'total_bookings': Booking.objects.count(),
        'pending_bookings': Booking.objects.filter(status='pending').count(),
        'total_inquiries': ContactInquiry.objects.count(),
        'unread_inquiries': ContactInquiry.objects.filter(is_read=False).count(),
        'recent_bookings': Booking.objects.order_by('-created_at')[:5],
        'recent_inquiries': ContactInquiry.objects.order_by('-created_at')[:5],
    }
    
    context = {
        'stats': stats,
        'title': 'Dashboard',
    }
    return render(request, 'admin_panel/dashboard.html', context)


# ========== Car Management Views ==========

@login_required
def car_list(request):
    """List all cars"""
    cars = Car.objects.all()
    context = {
        'cars': cars,
        'title': 'Manage Cars',
    }
    return render(request, 'admin_panel/cars/list.html', context)


@login_required
def car_create(request):
    """Create a new car"""
    if request.method == 'POST':
        form = CarForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Car added successfully.')
            return redirect('admin_panel:car_list')
    else:
        form = CarForm()
    
    context = {
        'form': form,
        'title': 'Add New Car',
        'action': 'Create',
    }
    return render(request, 'admin_panel/cars/form.html', context)


@login_required
def car_edit(request, car_id):
    """Edit an existing car"""
    car = get_object_or_404(Car, id=car_id)
    if request.method == 'POST':
        form = CarForm(request.POST, request.FILES, instance=car)
        if form.is_valid():
            form.save()
            messages.success(request, 'Car updated successfully.')
            return redirect('admin_panel:car_list')
    else:
        form = CarForm(instance=car)
    
    context = {
        'form': form,
        'car': car,
        'title': 'Edit Car',
        'action': 'Update',
    }
    return render(request, 'admin_panel/cars/form.html', context)


@login_required
def car_delete(request, car_id):
    """Delete a car"""
    car = get_object_or_404(Car, id=car_id)
    if request.method == 'POST':
        car.delete()
        messages.success(request, 'Car deleted successfully.')
        return redirect('admin_panel:car_list')
    
    context = {
        'car': car,
        'title': 'Delete Car',
    }
    return render(request, 'admin_panel/cars/delete.html', context)


# ========== Booking Management Views ==========

@login_required
def booking_list(request):
    """List all bookings"""
    status_filter = request.GET.get('status', '')
    bookings = Booking.objects.all()
    
    if status_filter:
        bookings = bookings.filter(status=status_filter)
    
    context = {
        'bookings': bookings,
        'status_filter': status_filter,
        'title': 'Manage Bookings',
    }
    return render(request, 'admin_panel/bookings/list.html', context)


@login_required
def booking_detail(request, booking_id):
    """View booking details"""
    booking = get_object_or_404(Booking, id=booking_id)
    context = {
        'booking': booking,
        'title': f'Booking {booking.booking_reference}',
    }
    return render(request, 'admin_panel/bookings/detail.html', context)


@login_required
def booking_update_status(request, booking_id):
    """Update booking status"""
    booking = get_object_or_404(Booking, id=booking_id)
    if request.method == 'POST':
        new_status = request.POST.get('status')
        if new_status in dict(Booking.STATUS_CHOICES):
            booking.status = new_status
            booking.save()
            messages.success(request, f'Booking status updated to {booking.get_status_display()}.')
        return redirect('admin_panel:booking_detail', booking_id=booking.id)
    
    return redirect('admin_panel:booking_list')


@login_required
def booking_delete(request, booking_id):
    """Delete a booking"""
    booking = get_object_or_404(Booking, id=booking_id)
    if request.method == 'POST':
        booking_ref = booking.booking_reference
        booking.delete()
        messages.success(request, f'Booking {booking_ref} has been deleted successfully.')
        return redirect('admin_panel:booking_list')
    
    context = {
        'booking': booking,
        'title': f'Delete Booking {booking.booking_reference}',
    }
    return render(request, 'admin_panel/bookings/delete.html', context)


# ========== Contact Inquiry Views ==========

@login_required
def inquiry_list(request):
    """List all contact inquiries"""
    inquiries = ContactInquiry.objects.all()
    context = {
        'inquiries': inquiries,
        'title': 'Contact Inquiries',
    }
    return render(request, 'admin_panel/inquiries/list.html', context)


@login_required
def inquiry_detail(request, inquiry_id):
    """View inquiry details and mark as read"""
    inquiry = get_object_or_404(ContactInquiry, id=inquiry_id)
    if not inquiry.is_read:
        inquiry.is_read = True
        inquiry.save()
    
    context = {
        'inquiry': inquiry,
        'title': 'Inquiry Details',
    }
    return render(request, 'admin_panel/inquiries/detail.html', context)


@login_required
def inquiry_delete(request, inquiry_id):
    """Delete an inquiry"""
    inquiry = get_object_or_404(ContactInquiry, id=inquiry_id)
    if request.method == 'POST':
        inquiry.delete()
        messages.success(request, f'Inquiry from "{inquiry.name}" has been deleted successfully.')
        return redirect('admin_panel:inquiry_list')
    
    context = {
        'inquiry': inquiry,
        'title': f'Delete Inquiry from {inquiry.name}',
    }
    return render(request, 'admin_panel/inquiries/delete.html', context)


# ========== Site Settings Views ==========

@login_required
def site_settings(request):
    """Edit site-wide settings"""
    settings_obj = SiteSetting.objects.first()
    if not settings_obj:
        settings_obj = SiteSetting.objects.create()
    
    if request.method == 'POST':
        form = SiteSettingForm(request.POST, instance=settings_obj)
        if form.is_valid():
            form.save()
            messages.success(request, 'Site settings updated successfully.')
            return redirect('admin_panel:dashboard')
    else:
        form = SiteSettingForm(instance=settings_obj)
    
    context = {
        'form': form,
        'title': 'Site Settings',
        'settings': settings_obj,
    }
    return render(request, 'admin_panel/settings/site_settings.html', context)


# ========== Statistics Management ==========

@login_required
def statistic_list(request):
    """List homepage statistics"""
    statistics = Statistic.objects.all()
    context = {
        'statistics': statistics,
        'title': 'Homepage Statistics',
    }
    return render(request, 'admin_panel/statistics/list.html', context)


@login_required
def statistic_create(request):
    """Create a new statistic"""
    if request.method == 'POST':
        form = StatisticForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Statistic added successfully.')
            return redirect('admin_panel:statistic_list')
    else:
        form = StatisticForm()
    
    context = {
        'form': form,
        'title': 'Add Statistic',
        'action': 'Create',
    }
    return render(request, 'admin_panel/statistics/form.html', context)


@login_required
def statistic_edit(request, stat_id):
    """Edit a statistic"""
    stat = get_object_or_404(Statistic, id=stat_id)
    if request.method == 'POST':
        form = StatisticForm(request.POST, instance=stat)
        if form.is_valid():
            form.save()
            messages.success(request, 'Statistic updated successfully.')
            return redirect('admin_panel:statistic_list')
    else:
        form = StatisticForm(instance=stat)
    
    context = {
        'form': form,
        'stat': stat,
        'title': 'Edit Statistic',
        'action': 'Update',
    }
    return render(request, 'admin_panel/statistics/form.html', context)


@login_required
def statistic_delete(request, stat_id):
    """Delete a statistic"""
    stat = get_object_or_404(Statistic, id=stat_id)
    if request.method == 'POST':
        stat.delete()
        messages.success(request, 'Statistic deleted successfully.')
        return redirect('admin_panel:statistic_list')
    
    context = {
        'stat': stat,
        'title': 'Delete Statistic',
    }
    return render(request, 'admin_panel/statistics/delete.html', context)


# ========== Team Member Management ==========

@login_required
def team_member_list(request):
    """List team members"""
    members = TeamMember.objects.all()
    context = {
        'members': members,
        'title': 'Team Members',
    }
    return render(request, 'admin_panel/team/list.html', context)


@login_required
def team_member_create(request):
    """Create a new team member"""
    if request.method == 'POST':
        form = TeamMemberForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Team member added successfully.')
            return redirect('admin_panel:team_list')
    else:
        form = TeamMemberForm()
    
    context = {
        'form': form,
        'title': 'Add Team Member',
        'action': 'Create',
    }
    return render(request, 'admin_panel/team/form.html', context)


@login_required
def team_member_edit(request, member_id):
    """Edit a team member"""
    member = get_object_or_404(TeamMember, id=member_id)
    if request.method == 'POST':
        form = TeamMemberForm(request.POST, request.FILES, instance=member)
        if form.is_valid():
            form.save()
            messages.success(request, 'Team member updated successfully.')
            return redirect('admin_panel:team_list')
    else:
        form = TeamMemberForm(instance=member)
    
    context = {
        'form': form,
        'member': member,
        'title': 'Edit Team Member',
        'action': 'Update',
    }
    return render(request, 'admin_panel/team/form.html', context)


@login_required
def team_member_delete(request, member_id):
    """Delete a team member"""
    member = get_object_or_404(TeamMember, id=member_id)
    if request.method == 'POST':
        member.delete()
        messages.success(request, 'Team member deleted successfully.')
        return redirect('admin_panel:team_list')
    
    context = {
        'member': member,
        'title': 'Delete Team Member',
    }
    return render(request, 'admin_panel/team/delete.html', context)


# ========== Page Content Management ==========

@login_required
def page_content_list(request):
    """List editable pages"""
    pages = PageContent.objects.all()
    context = {
        'pages': pages,
        'title': 'Page Contents',
    }
    return render(request, 'admin_panel/pages/list.html', context)


@login_required
def page_content_edit(request, page_type):
    """Edit page content"""
    page = get_object_or_404(PageContent, page_type=page_type)
    if request.method == 'POST':
        form = PageContentForm(request.POST, instance=page)
        if form.is_valid():
            form.save()
            messages.success(request, f'{page.get_page_type_display()} updated successfully.')
            return redirect('admin_panel:page_list')
    else:
        form = PageContentForm(instance=page)
    
    context = {
        'form': form,
        'page': page,
        'title': f'Edit {page.get_page_type_display()}',
    }
    return render(request, 'admin_panel/pages/form.html', context)


# ========== Payment Method Management ==========

@login_required
def payment_method_list(request):
    """List payment methods"""
    methods = PaymentMethod.objects.all()
    context = {
        'methods': methods,
        'title': 'Payment Methods',
    }
    return render(request, 'admin_panel/payments/list.html', context)


@login_required
def payment_method_create(request):
    """Create a new payment method"""
    if request.method == 'POST':
        form = PaymentMethodForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Payment method added successfully.')
            return redirect('admin_panel:payment_list')
    else:
        form = PaymentMethodForm()
    
    context = {
        'form': form,
        'title': 'Add Payment Method',
        'action': 'Create',
    }
    return render(request, 'admin_panel/payments/form.html', context)


@login_required
def payment_method_edit(request, method_id):
    """Edit a payment method"""
    method = get_object_or_404(PaymentMethod, id=method_id)
    if request.method == 'POST':
        form = PaymentMethodForm(request.POST, request.FILES, instance=method)
        if form.is_valid():
            form.save()
            messages.success(request, 'Payment method updated successfully.')
            return redirect('admin_panel:payment_list')
    else:
        form = PaymentMethodForm(instance=method)
    
    context = {
        'form': form,
        'method': method,
        'title': 'Edit Payment Method',
        'action': 'Update',
    }
    return render(request, 'admin_panel/payments/form.html', context)


@login_required
def payment_method_delete(request, method_id):
    """Delete a payment method"""
    method = get_object_or_404(PaymentMethod, id=method_id)
    if request.method == 'POST':
        method.delete()
        messages.success(request, 'Payment method deleted successfully.')
        return redirect('admin_panel:payment_list')
    
    context = {
        'method': method,
        'title': 'Delete Payment Method',
    }
    return render(request, 'admin_panel/payments/delete.html', context)

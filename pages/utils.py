import random
import string
import io
from django.template.loader import render_to_string
from django.conf import settings
from xhtml2pdf import pisa
from .models import Booking


def generate_invoice_pdf(booking):
    """Generate invoice PDF for a booking using xhtml2pdf"""
    html_string = render_to_string('pages/invoice_pdf.html', {
        'booking': booking,
        'car': booking.car,
    })
    
    # Create BytesIO buffer
    pdf_file = io.BytesIO()
    
    # Generate PDF
    pisa_status = pisa.CreatePDF(
        src=html_string,
        dest=pdf_file,
        encoding='utf-8'
    )
    
    if pisa_status.err:
        raise Exception('PDF generation error')
    
    pdf_file.seek(0)
    return pdf_file


def send_invoice_email(booking):
    """Send booking confirmation email with PDF invoice attachment"""
    subject = f'Booking Confirmed - Your Invoice | SSL Rent a Car BD (Ref: {booking.booking_reference})'

    message = f"""
Dear {booking.customer_name},

Thank you for booking with SSL Rent a Car BD!

Your booking is confirmed. Please find your invoice attached to this email.

Booking Details:
- Reference: {booking.booking_reference}
- Vehicle: {booking.car.name}
- Pickup: {booking.pickup_date.strftime('%B %d, %Y')} from {booking.pickup_location}
- Drop-off: {booking.dropoff_date.strftime('%B %d, %Y')} at {booking.dropoff_location}
- Duration: {booking.rental_days} day(s)
- Total: ৳{booking.total:,}

If you have any questions, contact us at +880 1849448321.

Best regards,
SSL Rent a Car BD Team
"""

    try:
        email = EmailMessage(
            subject=subject,
            body=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[booking.customer_email],
        )
        # Attach PDF invoice
        pdf_file = generate_invoice_pdf(booking)
        email.attach(f'invoice_{booking.booking_reference}.pdf', pdf_file.read(), 'application/pdf')
        email.send(fail_silently=False)
        return True
    except Exception as e:
        print(f"Invoice email failed: {e}")
        return False


def send_verification_email(booking):
    """Deprecated: Use send_invoice_email instead. Kept for backward compatibility."""
    pass


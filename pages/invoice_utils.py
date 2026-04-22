import io
from django.template.loader import render_to_string
from django.conf import settings
from weasyprint import HTML
from weasyprint.text.fonts import FontConfiguration


def generate_invoice_pdf(booking):
    """Generate invoice PDF for a booking"""
    # Render HTML template with booking context
    html_string = render_to_string('pages/invoice_pdf.html', {
        'booking': booking,
        'car': booking.car,
        'site_settings': settings.SITE_SETTINGS if hasattr(settings, 'SITE_SETTINGS') else None,
    })
    
    # Create PDF
    pdf_file = io.BytesIO()
    HTML(string=html_string).write_pdf(pdf_file)
    pdf_file.seek(0)
    return pdf_file

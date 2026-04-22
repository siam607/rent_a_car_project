import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rent_a_car.settings')
django.setup()

from pages.models import Car, Booking
from pages.utils import generate_invoice_pdf

# Get test booking
booking = Booking.objects.first()
if booking:
    pdf = generate_invoice_pdf(booking)
    print(f"PDF generated size: {len(pdf.read())} bytes")
    # Save to file for inspection
    with open('test_invoice.pdf', 'wb') as f:
        f.write(pdf.getvalue())
    print("Saved test_invoice.pdf")
else:
    print("No bookings found")

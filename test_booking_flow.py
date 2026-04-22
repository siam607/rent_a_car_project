import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rent_a_car.settings')
django.setup()

from pages.models import Car, Booking
from pages.utils import generate_invoice_pdf
import datetime

# Get first car
car = Car.objects.first()
if not car:
    print("No cars found. Please add a car first.")
else:
    # Create test booking
    booking = Booking.objects.create(
        car=car,
        customer_name="Test Customer",
        customer_email="test@example.com",
        customer_phone="+880 1XXX-XXXXXX",
        nid_passport="1234567890",
        pickup_date=datetime.date.today() + datetime.timedelta(days=1),
        dropoff_date=datetime.date.today() + datetime.timedelta(days=3),
        pickup_location="Dhaka",
        dropoff_location="Chittagong",
        rental_days=3,
        daily_rate=car.price_daily,
        subtotal=car.price_daily*3,
        discount=0,
        total=car.price_daily*3,
        booking_reference="RCBD-TEST-1234",
        email_verified=True,
    )
    print(f"Created booking: {booking.booking_reference}")
    
    try:
        pdf = generate_invoice_pdf(booking)
        path = 'test_invoice.pdf'
        with open(path, 'wb') as f:
            f.write(pdf.getvalue())
        print(f"PDF generated successfully: {len(pdf.getvalue())} bytes -> {path}")
    except Exception as e:
        print(f"PDF generation failed: {e}")

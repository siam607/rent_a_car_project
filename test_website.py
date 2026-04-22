import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rent_a_car.settings')
django.setup()

from django.test import Client

client = Client()
response = client.get('/')
print(f"Home page status: {response.status_code}")
print(f"Template used: {response.templates[0].name if response.templates else 'None'}")

response2 = client.get('/booking/')
print(f"Booking page status: {response2.status_code}")

# Test payment methods context
from pages.views import HomeView
from pages.models import PaymentMethod
pm_count = PaymentMethod.objects.count()
print(f"Payment methods in DB: {pm_count}")

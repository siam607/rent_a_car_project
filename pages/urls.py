from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('about/', views.AboutView.as_view(), name='about'),
    path('fleet/', views.FleetView.as_view(), name='fleet'),
    path('booking/', views.BookingView.as_view(), name='booking'),
    path('booking/success/', views.BookingSuccessView.as_view(), name='booking_success'),
    path('verify-email/', views.VerifyEmailView.as_view(), name='verify_email'),
    path('resend-otp/', views.ResendOTPView.as_view(), name='resend_otp'),
    path('contact/', views.ContactView.as_view(), name='contact'),
    path('car-details/<int:car_id>/', views.CarDetailsView.as_view(), name='car_details'),
    path('terms/', views.TermsView.as_view(), name='terms'),
    path('privacy/', views.PrivacyView.as_view(), name='privacy'),
    path('invoice/', views.InvoiceView.as_view(), name='invoice'),
]

from django.db import models
from django.contrib.auth.models import User


class Car(models.Model):
    """Car model for rent a car inventory"""
    TRANSMISSION_CHOICES = [
        ('automatic', 'Automatic'),
        ('manual', 'Manual'),
    ]
    FUEL_CHOICES = [
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('hybrid', 'Hybrid'),
        ('electric', 'Electric'),
    ]
    CATEGORY_CHOICES = [
        ('sedan', 'Sedan'),
        ('suv', 'SUV'),
        ('hatchback', 'Hatchback'),
        ('luxury', 'Luxury'),
        ('pickup', 'Pickup'),
    ]

    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    price_daily = models.PositiveIntegerField()
    price_weekly = models.PositiveIntegerField()
    price_monthly = models.PositiveIntegerField()
    image = models.ImageField(upload_to='cars/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True, help_text="External image URL if not uploading")
    
    # Specifications
    transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES)
    fuel_type = models.CharField(max_length=20, choices=FUEL_CHOICES)
    seats = models.PositiveSmallIntegerField()
    luggage = models.PositiveSmallIntegerField()
    ac = models.BooleanField(default=True)
    engine = models.CharField(max_length=20, blank=True)
    mileage = models.CharField(max_length=30, blank=True)
    
    features = models.JSONField(default=list, blank=True)
    description = models.TextField(blank=True)
    
    available = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_primary_image(self):
        """Return the primary image URL"""
        if self.image:
            return self.image.url
        return self.image_url

    def get_price_display(self):
        """Return formatted daily price"""
        return f"৳{self.price_daily:,}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Car'
        verbose_name_plural = 'Cars'


# ========== Admin Panel Models ==========

class Booking(models.Model):
    """Persistent storage for car bookings"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='bookings')
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)
    nid_passport = models.CharField(max_length=50, blank=True, default='', verbose_name='NID/Passport')
    pickup_date = models.DateField()
    dropoff_date = models.DateField()
    pickup_location = models.CharField(max_length=200)
    dropoff_location = models.CharField(max_length=200)
    rental_days = models.PositiveIntegerField()
    daily_rate = models.PositiveIntegerField()
    subtotal = models.PositiveIntegerField()
    discount = models.FloatField(default=0)
    total = models.PositiveIntegerField()
    booking_reference = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    # Email verification
    email_verified = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=6, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.booking_reference} - {self.customer_name}"
    
    @property
    def discount_amount(self):
        """Calculate discount amount in Taka"""
        return max(0, self.subtotal - self.total)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Booking'
        verbose_name_plural = 'Bookings'


class ContactInquiry(models.Model):
    """Persistent storage for contact form submissions"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.subject} - {self.name}"
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Inquiry'
        verbose_name_plural = 'Contact Inquiries'


class SiteSetting(models.Model):
    """Site-wide settings for the frontend"""
    # Contact Information
    phone_primary = models.CharField(max_length=20, default='+880 1849448321')
    phone_secondary = models.CharField(max_length=20, blank=True, default='+880 1849448321')
    email_primary = models.EmailField(default='info@sslrentacarbd.com')
    email_secondary = models.EmailField(blank=True, default='support@sslrentacarbd.com')
    address = models.TextField(default='House 123, Road 45, Dhanmondi, Dhaka - 1209, Bangladesh')
    
    # Business Hours
    business_hours = models.TextField(default='Sunday - Wednesday: 9:00 AM - 9:00 PM\nThursday - Saturday: 9:00 AM - 10:00 PM')
    
    # Social Media Links
    facebook_url = models.URLField(blank=True, default='https://facebook.com/sslrentacarbd')
    instagram_url = models.URLField(blank=True, default='https://instagram.com/sslrentacarbd')
    twitter_url = models.URLField(blank=True)
    whatsapp_url = models.URLField(blank=True)
    
    # Hero Section Content
    hero_title_line1 = models.CharField(max_length=100, default='Your Journey Begins')
    hero_title_line2 = models.CharField(max_length=100, default='With Perfect Ride')
    hero_subtitle = models.CharField(max_length=200, default='Experience luxury, comfort, and reliability with our premium fleet. Explore Bangladesh like never before.')
    hero_badge_text = models.CharField(max_length=100, default='Premium Car Rental in Bangladesh')
    
    # Footer Copyright
    copyright_year = models.CharField(max_length=4, default='2026')
    copyright_text = models.CharField(max_length=200, default='SSL Rent a Car BD. All rights reserved.')
    
    # SEO & Meta
    site_description = models.TextField(default='Premium car rental services across Bangladesh. Book your perfect ride with SSL Rent a Car BD.', blank=True)
    site_keywords = models.CharField(max_length=200, default='car rental Bangladesh, rent a car Dhaka, luxury car hire, premium car rental', blank=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return "Site Settings"
    
    class Meta:
        verbose_name = 'Site Setting'
        verbose_name_plural = 'Site Settings'


class Statistic(models.Model):
    """Homepage statistics (like vehicles count, happy customers, etc.)"""
    label = models.CharField(max_length=50)
    value = models.CharField(max_length=20)
    icon_class = models.CharField(max_length=50, default='bi bi-car-front', help_text='Bootstrap Icon class')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.label
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Statistic'
        verbose_name_plural = 'Statistics'


class TeamMember(models.Model):
    """About page team members"""
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    
    def get_primary_image(self):
        if self.image:
            return self.image.url
        return self.image_url or ''
    
    class Meta:
        ordering = ['order']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'


class PageContent(models.Model):
    """Editable content for static pages (About, Terms, Privacy)"""
    PAGE_CHOICES = [
        ('about', 'About Page'),
        ('terms', 'Terms of Service'),
        ('privacy', 'Privacy Policy'),
    ]
    
    page_type = models.CharField(max_length=20, choices=PAGE_CHOICES, unique=True)
    content = models.TextField(help_text='HTML content for the page')
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.get_page_type_display()
    
    class Meta:
        verbose_name = 'Page Content'
        verbose_name_plural = 'Page Contents'


class PaymentMethod(models.Model):
    """Payment methods displayed on website"""
    name = models.CharField(max_length=50)
    icon = models.ImageField(upload_to='payment_methods/', blank=True, null=True, help_text='Upload payment method icon image')
    icon_url = models.CharField(max_length=200, blank=True, help_text='Path or URL to payment icon (fallback if no upload)')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    def get_icon_url(self):
        """Return the icon URL, preferring uploaded image over URL"""
        if self.icon:
            return self.icon.url
        return self.icon_url or '/static/images/payment/default.svg'

    class Meta:
        ordering = ['order']
        verbose_name = 'Payment Method'
        verbose_name_plural = 'Payment Methods'

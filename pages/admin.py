from django.contrib import admin
from .models import Car, Booking, ContactInquiry

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price_daily', 'fuel_type', 'transmission', 'available', 'featured')
    list_filter = ('category', 'fuel_type', 'transmission', 'available', 'featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'slug', 'category', 'description')
        }),
        ('Pricing', {
            'fields': ('price_daily', 'price_weekly', 'price_monthly')
        }),
        ('Specifications', {
            'fields': ('transmission', 'fuel_type', 'seats', 'luggage', 'ac', 'engine', 'mileage')
        }),
        ('Media', {
            'fields': ('image', 'image_url')
        }),
        ('Features & Status', {
            'fields': ('features', 'available', 'featured')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('booking_reference', 'customer_name', 'car', 'pickup_date', 'dropoff_date', 'total', 'status', 'email_verified', 'created_at')
    list_filter = ('status', 'pickup_date', 'dropoff_date', 'car__category', 'email_verified')
    search_fields = ('booking_reference', 'customer_name', 'customer_email', 'car__name', 'nid_passport')
    readonly_fields = ('booking_reference', 'created_at', 'updated_at', 'otp_code', 'otp_created_at')
    fieldsets = (
        ('Booking Info', {
            'fields': ('booking_reference', 'car', 'status')
        }),
        ('Customer Details', {
            'fields': ('customer_name', 'customer_email', 'customer_phone', 'nid_passport')
        }),
        ('Rental Details', {
            'fields': ('pickup_date', 'dropoff_date', 'pickup_location', 'dropoff_location', 'rental_days', 'daily_rate')
        }),
        ('Pricing', {
            'fields': ('subtotal', 'discount', 'total')
        }),
        ('Verification', {
            'fields': ('email_verified', 'otp_code', 'otp_created_at'),
            'classes': ('collapse',)
        }),
        ('Additional', {
            'fields': ('notes',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('subject', 'name', 'email', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('is_read',)
    fieldsets = (
        ('Sender Info', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message', {
            'fields': ('subject', 'message')
        }),
        ('Status', {
            'fields': ('is_read',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

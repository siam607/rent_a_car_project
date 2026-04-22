from django import forms
from django.core.validators import MinValueValidator
from datetime import date
from .models import Car


class BookingForm(forms.Form):
    car = forms.ModelChoiceField(
        queryset=Car.objects.filter(available=True),
        label='Select Car',
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'carSelect'}),
        empty_label='Choose a car...'
    )
    pickup_date = forms.DateField(
        label='Pickup Date',
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control', 'id': 'pickupDate'}),
        required=True
    )
    dropoff_date = forms.DateField(
        label='Drop-off Date',
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control', 'id': 'dropoffDate'}),
        required=True
    )
    customer_name = forms.CharField(
        max_length=100,
        label='Full Name',
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'fullName', 'placeholder': 'Your full name'}),
        required=True
    )
    customer_email = forms.EmailField(
        label='Email Address',
        widget=forms.EmailInput(attrs={'class': 'form-control', 'id': 'email', 'placeholder': 'your@email.com'}),
        required=True
    )
    customer_phone = forms.CharField(
        max_length=20,
        label='Phone Number',
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'phone', 'placeholder': '+880 1XXX-XXXXXX'}),
        required=True
    )
    nid_passport = forms.CharField(
        max_length=50,
        label='NID/Passport Number',
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'nidPassport', 'placeholder': 'Your NID or passport number'}),
        required=True
    )
    notes = forms.CharField(
        max_length=500,
        label='Additional Notes',
        widget=forms.Textarea(attrs={'class': 'form-control', 'id': 'notes', 'rows': 3, 'placeholder': 'Any special requirements...'}),
        required=False
    )

    def clean(self):
        cleaned_data = super().clean()
        pickup_date = cleaned_data.get('pickup_date')
        dropoff_date = cleaned_data.get('dropoff_date')

        if pickup_date and dropoff_date:
            if pickup_date > dropoff_date:
                raise forms.ValidationError('Drop-off date must be after pickup date.')
            if pickup_date < date.today():
                raise forms.ValidationError('Pickup date cannot be in the past.')

        return cleaned_data


class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        label='Your Name',
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'contactName', 'placeholder': 'Enter your name'}),
        required=True
    )
    email = forms.EmailField(
        label='Email Address',
        widget=forms.EmailInput(attrs={'class': 'form-control', 'id': 'contactEmail', 'placeholder': 'your@email.com'}),
        required=True
    )
    phone = forms.CharField(
        max_length=20,
        label='Phone Number',
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'contactPhone', 'placeholder': '+8801XXXXXXXX'}),
        required=False
    )
    subject = forms.CharField(
        max_length=200,
        label='Subject',
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'contactSubject', 'placeholder': 'How can we help?'}),
        required=True
    )
    message = forms.CharField(
        label='Message',
        widget=forms.Textarea(attrs={'class': 'form-control', 'id': 'contactMessage', 'rows': 6, 'placeholder': 'Tell us more...'}),
        required=True
    )

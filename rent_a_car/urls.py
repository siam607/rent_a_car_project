"""
URL configuration for rent_a_car project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path, reverse
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import redirect

def redirect_old_car_details(request):
    """Redirect old /fleet/car-details.html?id=X to new /car-details/X/"""
    car_id = request.GET.get('id')
    if car_id and car_id.isdigit():
        return redirect('pages:car_details', car_id=int(car_id), permanent=True)
    return redirect('pages:fleet')  # fallback to fleet page

def redirect_old_booking(request):
    """Redirect old /fleet/booking.html?car=X or /booking.html?car=X to new /booking/?car=X (preserves query string)"""
    base_url = reverse('pages:booking')
    query_string = request.META.get('QUERY_STRING', '')
    if query_string:
        base_url = f"{base_url}?{query_string}"
    return HttpResponsePermanentRedirect(base_url)

def redirect_old_page(request, page_name):
    """Redirect old static HTML pages to their Django equivalents"""
    mapping = {
        'index.html': 'pages:home',
        'fleet.html': 'pages:fleet',
        'booking.html': 'pages:booking',
        'contact.html': 'pages:contact',
        'about.html': 'pages:about',
        'terms.html': 'pages:terms',
        'privacy.html': 'pages:privacy',
        'car-details.html': 'pages:car_details',
    }
    url_name = mapping.get(page_name, 'pages:home')
    return redirect(url_name, permanent=True)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', include('admin_panel.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include(('pages.urls', 'pages'), namespace='pages')),
    # Redirects for old static HTML URLs
    re_path(r'^fleet/car-details\.html$', redirect_old_car_details),
    re_path(r'^fleet/booking\.html$', redirect_old_booking),
    re_path(r'^booking\.html$', redirect_old_booking),
    # Generic redirect for any other old static .html file at root level
    re_path(r'^(?P<page_name>index|fleet|contact|about|terms|privacy|car-details)\.html$', redirect_old_page),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

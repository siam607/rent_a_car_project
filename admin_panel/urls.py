from django.urls import path
from . import views

app_name = 'admin_panel'

urlpatterns = [
    # Authentication
    path('login/', views.admin_login, name='login'),
    path('logout/', views.admin_logout, name='logout'),
    
    # Dashboard
    path('', views.dashboard, name='dashboard'),
    
    # Cars
    path('cars/', views.car_list, name='car_list'),
    path('cars/create/', views.car_create, name='car_create'),
    path('cars/<int:car_id>/edit/', views.car_edit, name='car_edit'),
    path('cars/<int:car_id>/delete/', views.car_delete, name='car_delete'),
    
    # Bookings
    path('bookings/', views.booking_list, name='booking_list'),
    path('bookings/<int:booking_id>/', views.booking_detail, name='booking_detail'),
    path('bookings/<int:booking_id>/update-status/', views.booking_update_status, name='booking_update_status'),
    path('bookings/<int:booking_id>/delete/', views.booking_delete, name='booking_delete'),
    
     # Inquiries
     path('inquiries/', views.inquiry_list, name='inquiry_list'),
     path('inquiries/<int:inquiry_id>/', views.inquiry_detail, name='inquiry_detail'),
     path('inquiries/<int:inquiry_id>/delete/', views.inquiry_delete, name='inquiry_delete'),
    
    # Site Settings
    path('settings/', views.site_settings, name='site_settings'),
    
    # Statistics
    path('statistics/', views.statistic_list, name='statistic_list'),
    path('statistics/create/', views.statistic_create, name='statistic_create'),
    path('statistics/<int:stat_id>/edit/', views.statistic_edit, name='statistic_edit'),
    path('statistics/<int:stat_id>/delete/', views.statistic_delete, name='statistic_delete'),
    
    # Team Members
    path('team/', views.team_member_list, name='team_list'),
    path('team/create/', views.team_member_create, name='team_create'),
    path('team/<int:member_id>/edit/', views.team_member_edit, name='team_edit'),
    path('team/<int:member_id>/delete/', views.team_member_delete, name='team_delete'),
    
    # Page Content
    path('pages/', views.page_content_list, name='page_list'),
    path('pages/<str:page_type>/edit/', views.page_content_edit, name='page_edit'),
    
    # Payment Methods
    path('payments/', views.payment_method_list, name='payment_list'),
    path('payments/create/', views.payment_method_create, name='payment_create'),
    path('payments/<int:method_id>/edit/', views.payment_method_edit, name='payment_edit'),
    path('payments/<int:method_id>/delete/', views.payment_method_delete, name='payment_delete'),
]

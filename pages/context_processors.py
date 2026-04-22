from pages.models import SiteSetting, Statistic, PaymentMethod

def site_settings(request):
    """Make site settings available to all templates"""
    settings = SiteSetting.objects.first()
    statistics = Statistic.objects.filter(is_active=True).order_by('order')
    payment_methods = PaymentMethod.objects.filter(is_active=True).order_by('order')
    
    return {
        'site_settings': settings,
        'site_statistics': statistics,
        'payment_methods': payment_methods,
    }

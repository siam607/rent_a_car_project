from django.db.models.signals import post_migrate
from django.dispatch import receiver
from pages.models import SiteSetting, Statistic, TeamMember, PageContent, PaymentMethod


@receiver(post_migrate)
def create_initial_data(sender, **kwargs):
    """Create initial data after migrations"""
    if sender.name == 'pages':
        # Create default site settings
        if not SiteSetting.objects.exists():
            SiteSetting.objects.create()
        
        # Create default statistics
        default_stats = [
            {'label': 'Vehicles', 'value': '50+', 'icon_class': 'bi bi-car-front', 'order': 1},
            {'label': 'Happy Customers', 'value': '10K+', 'icon_class': 'bi bi-people', 'order': 2},
            {'label': 'Locations', 'value': '5', 'icon_class': 'bi bi-geo-alt', 'order': 3},
            {'label': 'Years Experience', 'value': '9+', 'icon_class': 'bi bi-trophy', 'order': 4},
        ]
        for stat_data in default_stats:
            Statistic.objects.get_or_create(label=stat_data['label'], defaults=stat_data)
        
        # Create default team members
        default_team = [
            {
                'name': 'Md. Sabbir Ahmed Siam',
                'position': 'Founder & CEO',
                'bio': 'With over 9 years in the transportation industry, Siam founded SSL Rent a Car BD to revolutionize car rentals in Bangladesh.',
                'order': 1
            },
            {
                'name': 'Md. Limon Islam',
                'position': 'Operations Director',
                'bio': 'Limon ensures our fleet is always in top condition and our operations run smoothly across all locations.',
                'order': 2
            },
            {
                'name': 'Saiful Islam',
                'position': 'Customer Service Manager',
                'bio': 'Saiful leads our 24/7 support team, ensuring every customer receives prompt, friendly assistance.',
                'order': 3
            },
        ]
        for member_data in default_team:
            TeamMember.objects.get_or_create(name=member_data['name'], defaults=member_data)
        
        # Create default page contents
        default_pages = [
            {
                'page_type': 'about',
                'meta_title': 'About Us - SSL Rent a Car BD | Premium Car Rental',
                'meta_description': 'Learn about SSL Rent a Car BD, Bangladesh\'s trusted car rental service. Discover our mission, values, and commitment to excellence.',
            },
            {
                'page_type': 'terms',
                'meta_title': 'Terms of Service - SSL Rent a Car BD',
                'meta_description': 'Terms of service for using SSL Rent a Car BD services.',
            },
            {
                'page_type': 'privacy',
                'meta_title': 'Privacy Policy - SSL Rent a Car BD',
                'meta_description': 'Privacy policy for SSL Rent a Car BD.',
            },
        ]
        for page_data in default_pages:
            PageContent.objects.get_or_create(page_type=page_data['page_type'], defaults=page_data)
        
        # Create default payment methods (empty icons, admin can fill)
        default_payments = [
            {'name': 'bKash', 'order': 1},
            {'name': 'Nagad', 'order': 2},
            {'name': 'Rocket', 'order': 3},
            {'name': 'SSLCommerz', 'order': 4},
            {'name': 'Upay', 'order': 5},
            {'name': 'SureCash', 'order': 6},
            {'name': 'Visa/Mastercard', 'order': 7},
            {'name': 'Dutch Bangla Bank', 'order': 8},
            {'name': 'BRAC Bank', 'order': 9},
            {'name': 'City Bank', 'order': 10},
            {'name': 'Eastern Bank', 'order': 11},
            {'name': 'Islami Bank', 'order': 12},
            {'name': 'AB Bank', 'order': 13},
            {'name': 'Standard Chartered', 'order': 14},
        ]
        for payment_data in default_payments:
            PaymentMethod.objects.get_or_create(name=payment_data['name'], defaults=payment_data)

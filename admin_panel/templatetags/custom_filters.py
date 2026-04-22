from django import template

register = template.Library()

@register.filter(name='intcomma')
def intcomma(value):
    """Format number with commas (e.g., 1234567 -> 1,234,567) - Django built-in replacement"""
    try:
        value = int(float(value))
        return f"{value:,}"
    except (ValueError, TypeError):
        return value

@register.filter
def format_number(value):
    """Format number with commas (e.g., 1234567 -> 1,234,567)"""
    try:
        value = int(float(value))
        return f"{value:,}"
    except (ValueError, TypeError):
        return value

@register.filter
def format_taka(value):
    """Format number with commas and Taka symbol (e.g., ৳1,234,567)"""
    try:
        value = int(float(value))
        return f"৳{value:,}"
    except (ValueError, TypeError):
        return value

@register.filter(name='abs')
def abs_value(value):
    """Return absolute value of a number"""
    try:
        return abs(float(value))
    except (ValueError, TypeError):
        return value
// ========================================
// RENTCARBD - Main JavaScript
// Common functions used across all pages
// ========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// Main initialization
function initApp() {
    initScrollToTop();
    initDatePickers();
    initMobileMenu();
    setMinDate();
    initNavbarScroll();
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');

    if (!scrollBtn) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== DATE PICKERS =====
function initDatePickers() {
    const pickupInput = document.getElementById('pickupDate');
    const dropoffInput = document.getElementById('dropoffDate');

    if (!pickupInput || !dropoffInput) return;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    pickupInput.min = today;
    dropoffInput.min = today;

    // When pickup date changes, set minimum dropoff date
    pickupInput.addEventListener('change', function() {
        const pickupDate = new Date(this.value);
        pickupDate.setDate(pickupDate.getDate() + 1);
        const minDropoff = pickupDate.toISOString().split('T')[0];
        dropoffInput.min = minDropoff;

        // If dropoff is before pickup, reset it
        if (dropoffInput.value && new Date(dropoffInput.value) <= new Date(this.value)) {
            dropoffInput.value = minDropoff;
        }
    });
}

// Set minimum date for all date inputs
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');

    dateInputs.forEach(input => {
        if (input.hasAttribute('min')) return;
        if (input.id === 'pickupDate' || input.id === 'dropoffDate') return;
        input.min = today;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (!navbarToggler || !navbarCollapse) return;

    // Close menu when clicking on a link
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarCollapse.classList.remove('show');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class based on scroll position
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== UTILITY FUNCTIONS =====

// Format price in BDT
function formatPrice(price) {
    return '৳' + price.toLocaleString('en-IN');
}

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-BD', options);
}

// Calculate number of days between two dates
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both days
}

// Generate random booking reference
function generateBookingRef() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let ref = 'RCBD-';

    for (let i = 0; i < 3; i++) {
        ref += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    ref += '-';

    for (let i = 0; i < 4; i++) {
        ref += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return ref;
}

// Show loading spinner
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="spinner-overlay"><div class="spinner"></div></div>';
    }
}

// Hide loading spinner
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const spinner = element.querySelector('.spinner-overlay');
        if (spinner) spinner.remove();
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';

    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHTML);

    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    // Remove from DOM after hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Validate Bangladeshi phone number
function validatePhoneBD(phone) {
    // Accepts formats: +8801XXXXXXXX, 01XXXXXXXXX, 88XXXXXXXXXX
    const regex = /^(\+88|0)?1[3-9]\d{8}$/;
    return regex.test(phone.replace(/\s/g, ''));
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Save data to localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

// Get data from localStorage
function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to read from localStorage:', e);
        return null;
    }
}

// Clear localStorage data
function clearStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error('Failed to clear localStorage:', e);
    }
}

// Animate elements on scroll (simple version)
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// Shuffle array (Fisher-Yates)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Console welcome message
console.log('%c SSL Rent a Car BD ', 'background: #1e88e5; color: white; font-size: 20px; padding: 10px;');
console.log('Car Rental Website for Bangladesh');

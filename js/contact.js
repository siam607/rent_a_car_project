// ========================================
// RENTCARBD - Contact Page JavaScript
// Handles contact form validation and submission
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleContactSubmit);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;

    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    // Get form data
    const formData = {
        name: form.contactName.value,
        email: form.contactEmail.value,
        phone: form.contactPhone.value,
        subject: form.contactSubject.value,
        message: form.contactMessage.value,
        timestamp: new Date().toISOString()
    };

    // Save to localStorage (mock submission)
    const inquiries = getInquiries();
    inquiries.push(formData);
    saveInquiries(inquiries);

    // Show success message
    showToast('Thank you! Your message has been sent. We\'ll contact you soon.', 'success');

    // Reset form
    form.reset();
    form.classList.remove('was-validated');
}

// Get inquiries from localStorage
function getInquiries() {
    const inquiries = getFromStorage('rentcarbd_inquiries') || [];
    return inquiries;
}

// Save inquiries to localStorage
function saveInquiries(inquiries) {
    saveToStorage('rentcarbd_inquiries', inquiries);
}

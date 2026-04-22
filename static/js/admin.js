// ========== Modern Admin Panel JavaScript ==========

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle with smooth animation
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const overlay = createOverlay();

    if (sidebarToggle && sidebar) {
        // restore sidebar state
        const savedState = localStorage.getItem('admin_sidebar_collapsed');
        if (savedState === 'true') {
            sidebar.classList.add('collapsed');
        }

        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            toggleOverlay();
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('admin_sidebar_collapsed', isCollapsed);
        });

        // Close sidebar when clicking overlay on mobile
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('show');
            overlay.classList.remove('active');
        });
    }

    // Create mobile sidebar overlay
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        return overlay;
    }

    function toggleOverlay() {
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('show')) {
                overlay.classList.remove('active');
            } else {
                overlay.classList.add('active');
            }
        }
    }

    // Handle responsive sidebar
    function handleResize() {
        if (window.innerWidth > 768) {
            overlay.classList.remove('active');
            sidebar.classList.remove('show');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // initial check

    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert:not([data-no-autohide])');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            if (alert.classList.contains('show')) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    });

    // Auto-submit status select change for bookings
    const bookingStatusSelects = document.querySelectorAll('select[name="status"]');
    bookingStatusSelects.forEach(function(select) {
        select.addEventListener('change', function() {
            const form = this.closest('form');
            if (form) {
                this.disabled = true;
                this.innerHTML = '<option>Updating...</option>';
                form.submit();
            }
        });
    });

    // Confirm before delete actions
    const deleteButtons = document.querySelectorAll('[data-bs-target^="#deleteModal"]');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Modal will handle confirmation
        });
    });

    // Auto-generate slug from name for Car form
    const carNameInput = document.getElementById('id_name');
    const carSlugInput = document.getElementById('id_slug');

    if (carNameInput && carSlugInput && !carSlugInput.value) {
        carNameInput.addEventListener('input', function() {
            const name = this.value.toLowerCase().trim();
            const slug = name
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');

            if (!carSlugInput.value) {
                carSlugInput.value = slug;
            }
        });
    }

    // Smooth hover effects for table rows
    const tableRows = document.querySelectorAll('.table tbody tr');
    tableRows.forEach(function(row) {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.005)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Image preview for car form
    const imageInput = document.getElementById('id_image');
    if (imageInput) {
        imageInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    let previewContainer = document.querySelector('.image-preview-container');
                    if (!previewContainer) {
                        previewContainer = document.createElement('div');
                        previewContainer.className = 'image-preview-container mt-2';
                        imageInput.parentNode.appendChild(previewContainer);
                    }
                    previewContainer.innerHTML = `
                        <img src="${e.target.result}" alt="Preview" style="max-width: 150px; max-height: 150px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                        <p class="small text-muted mt-1">Selected image preview</p>
                    `;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Form validation highlight
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#48bb78';
            } else if (this.value) {
                this.style.borderColor = '#fc8181';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });

    // Stats cards animation on load
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(function() {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Active sidebar link detection
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(function(link) {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').replace(/\/$/, ''))) {
            link.classList.add('active');
        }
    });

    // Search functionality enhancement (if exists)
    const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
    searchInputs.forEach(function(input) {
        input.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const table = e.target.closest('table') || e.target.closest('.table-responsive')?.querySelector('table');
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(function(row) {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        }, 300));
    });

    // Debounce utility
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

    // Print functionality
    const printButtons = document.querySelectorAll('[data-print]');
    printButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const contentSelector = this.getAttribute('data-print');
            const content = document.querySelector(contentSelector);
            if (content) {
                const printWindow = window.open('', '_blank');
                printWindow.document.write('<html><head><title>Print</title>');
                printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
                printWindow.document.write('<style>body { padding: 20px; font-family: Inter, sans-serif; }</style>');
                printWindow.document.write('</head><body>');
                printWindow.document.write(content.innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.focus();
                setTimeout(function() {
                    printWindow.print();
                    printWindow.close();
                }, 250);
            }
        });
    });

    // Tooltip initialization for buttons
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Export button creation for tables (optional)
    const tables = document.querySelectorAll('.table-responsive');
    tables.forEach(function(wrapper) {
        const table = wrapper.querySelector('table');
        if (table && !wrapper.querySelector('.export-buttons')) {
            const exportDiv = document.createElement('div');
            exportDiv.className = 'export-buttons mb-2';
            exportDiv.innerHTML = `
                <button class="btn btn-sm btn-outline-primary" onclick="exportTableToCSV(this)">
                    <i class="bi bi-download me-1"></i> Export CSV
                </button>
            `;
            wrapper.parentNode.insertBefore(exportDiv, wrapper);
        }
    });
});

// CSV Export function
function exportTableToCSV(button) {
    const table = button.closest('.card-body').querySelector('table');
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(function(row) {
        const cols = row.querySelectorAll('th, td');
        let rowData = [];
        cols.forEach(function(col) {
            // Get text content only
            let data = col.textContent.trim();
            // Escape quotes
            data = data.replace(/"/g, '""');
            rowData.push(`"${data}"`);
        });
        csv.push(rowData.join(','));
    });

    const csvString = csv.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'export.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Format currency (Bangladeshi Taka)
function formatTaka(amount) {
    return '৳' + amount.toLocaleString('en-IN');
}

// Show toast notification
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert" style="min-width: 300px;">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

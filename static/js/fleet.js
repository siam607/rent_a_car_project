// ========================================
// RENTCARBD - Fleet Page JavaScript
// Handles car filtering, search, and pagination
// ========================================

let allCars = [];
let filteredCars = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    loadCars();
});

// Load all cars from data
function loadCars() {
    allCars = [...carsData];
    filteredCars = [...carsData];

    renderCars(filteredCars);
    updateResultsCount();

    // Load initial filters from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const location = urlParams.get('location');

    if (category) {
        document.getElementById('categoryFilter').value = category;
        filterCars();
    }
}

// Initialize filter event listeners
function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');
    const resetBtn = document.getElementById('resetFilters');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCars);
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', filterCars);
    }

    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterCars, 300));
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
}

// Main filter function
function filterCars() {
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    filteredCars = allCars.filter(car => {
        // Category filter
        if (category !== 'all' && car.category !== category) {
            return false;
        }

        // Price filter
        if (priceRange !== 'all') {
            const price = car.priceDaily;
            if (priceRange === '0-3000' && price > 3000) return false;
            if (priceRange === '3000-5000' && (price < 3000 || price > 5000)) return false;
            if (priceRange === '5000-10000' && (price < 5000 || price > 10000)) return false;
            if (priceRange === '10000+' && price < 10000) return false;
        }

        // Search filter
        if (searchTerm) {
            const searchable = `${car.name} ${car.specs.make} ${car.specs.model} ${car.category}`.toLowerCase();
            if (!searchable.includes(searchTerm)) {
                return false;
            }
        }

        return true;
    });

    renderCars(filteredCars);
    updateResultsCount();
}

// Render cars to grid
function renderCars(cars) {
    const grid = document.getElementById('fleetGrid');
    const noResults = document.getElementById('noResults');

    if (!grid) return;

    if (cars.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.classList.remove('d-none');
        return;
    }

    if (noResults) noResults.classList.add('d-none');

    const carHTML = cars.map(car => createCarCard(car)).join('');
    grid.innerHTML = carHTML;

    // Add animation
    const cards = grid.querySelectorAll('.car-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Create car card HTML
function createCarCard(car) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="car-card">
                <div class="car-card-img">
                    <span class="car-card-category">${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</span>
                    <img src="${car.images[0]}" alt="${car.name}" loading="lazy">
                </div>
                <div class="car-card-body">
                    <h5 class="car-card-title">${car.name}</h5>
                    <div class="car-card-price">
                        ৳${car.priceDaily.toLocaleString()} <span>/ day</span>
                    </div>
                    <div class="car-card-specs">
                        <div class="car-spec-item">
                            <i class="bi bi-gear"></i>
                            <small>${car.specs.transmission}</small>
                        </div>
                        <div class="car-spec-item">
                            <i class="bi bi-fuel-pump"></i>
                            <small>${car.specs.fuelType}</small>
                        </div>
                        <div class="car-spec-item">
                            <i class="bi bi-people"></i>
                            <small>${car.specs.seats} Seats</small>
                        </div>
                    </div>
                    <p class="text-muted small mb-0 text-clamp-2">
                        ${car.description}
                    </p>
                </div>
                <div class="car-card-footer">
                    <div class="d-flex gap-2">
                         <a href="/car-details/${car.id}/" class="btn btn-outline-primary flex-grow-1">
                            <i class="bi bi-eye me-1"></i>Details
                        </a>
                         <a href="/booking/?car=${car.id}" class="btn btn-primary flex-grow-1">
                            <i class="bi bi-calendar-check me-1"></i>Book
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Reset all filters
function resetFilters() {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('searchInput').value = '';

    filteredCars = [...allCars];
    renderCars(filteredCars);
    updateResultsCount();

    showToast('Filters reset successfully');
}

// Update results count display
function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        countElement.innerHTML = `Showing <strong>${filteredCars.length}</strong> car${filteredCars.length !== 1 ? 's' : ''}`;
    }
}

// Sort cars by price (low to high)
function sortByPriceLow() {
    filteredCars.sort((a, b) => a.priceDaily - b.priceDaily);
    renderCars(filteredCars);
}

// Sort cars by price (high to low)
function sortByPriceHigh() {
    filteredCars.sort((a, b) => b.priceDaily - a.priceDaily);
    renderCars(filteredCars);
}

// Sort by name
function sortByName() {
    filteredCars.sort((a, b) => a.name.localeCompare(b.name));
    renderCars(filteredCars);
}

// Export for window access if needed
window.fleetFunctions = {
    filterCars,
    resetFilters,
    sortByPriceLow,
    sortByPriceHigh,
    sortByName
};

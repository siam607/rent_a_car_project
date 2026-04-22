// ========================================
// RENTCARBD - Homepage JavaScript
// Handles homepage-specific functionality
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedCars();
    initHeroSearch();
});

// Load featured cars on homepage
function loadFeaturedCars() {
    const carGrid = document.getElementById('featuredCars');
    if (!carGrid) return;

    // Get up to 3 featured cars
    const featuredCars = carsData.filter(car => car.featured).slice(0, 3);

    if (featuredCars.length === 0) {
        carGrid.innerHTML = '<p class="text-muted">No featured cars available.</p>';
        return;
    }

    const carHTML = featuredCars.map(car => createCarCard(car)).join('');
    carGrid.innerHTML = carHTML;

    // Add animation after load
    setTimeout(() => {
        carGrid.querySelectorAll('.car-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fade-in-up');
        });
    }, 100);
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
                        <a href="car-details.html?id=${car.id}" class="btn btn-outline-primary flex-grow-1">
                            <i class="bi bi-eye me-1"></i>Details
                        </a>
                        <a href="booking.html?car=${car.id}" class="btn btn-primary flex-grow-1">
                            <i class="bi bi-calendar-check me-1"></i>Book
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize hero search form
function initHeroSearchForm() {
    const heroForm = document.getElementById('heroSearchForm');
    if (!heroForm) return;

    heroForm.addEventListener('submit', function(e) {
        const location = heroForm.querySelector('[name="location"]').value;
        const pickupDate = heroForm.querySelector('[name="pickup_date"]').value;
        const dropoffDate = heroForm.querySelector('[name="dropoff_date"]').value;

        // Validate dates
        if (!pickupDate || !dropoffDate) {
            e.preventDefault();
            showToast('Please select both pickup and drop-off dates', 'error');
            return;
        }

        if (new Date(pickupDate) >= new Date(dropoffDate)) {
            e.preventDefault();
            showToast('Drop-off date must be after pickup date', 'error');
            return;
        }

        // Form will submit to fleet.html with query params
    });
}

// Initialize hero search
function initHeroSearch() {
    const pickupInput = document.getElementById('pickupDate');
    const dropoffInput = document.getElementById('dropoffDate');

    if (!pickupInput || !dropoffInput) return;

    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    pickupInput.min = today;
    pickupInput.value = today;
    dropoffInput.min = tomorrowStr;
    dropoffInput.value = tomorrowStr;

    // Add change listeners for validations
    pickupInput.addEventListener('change', function() {
        const pickupDate = new Date(this.value);
        pickupDate.setDate(pickupDate.getDate() + 1);
        const minDropoff = pickupDate.toISOString().split('T')[0];

        dropoffInput.min = minDropoff;

        if (new Date(dropoffInput.value) <= new Date(this.value)) {
            dropoffInput.value = minDropoff;
        }
    });

    initHeroSearchForm();
}

// Shuffle and get random featured cars for carousel (if needed)
function getRandomCars(count = 3) {
    return shuffleArray(carsData).slice(0, count);
}

// Export for use in other scripts if needed
window.homepageFunctions = {
    loadFeaturedCars,
    getRandomCars
};

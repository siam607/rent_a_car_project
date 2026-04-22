// ========================================
// RENTCARBD - Car Details JavaScript
// Handles image gallery, car info display, and booking initiation
// ========================================

let currentCar = null;
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadCarDetails();
});

// Load car details from URL parameter
function loadCarDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id')) || 1; // Default to car 1

    // Find car in database
    currentCar = carsData.find(car => car.id === carId);

    if (!currentCar) {
        displayCarNotFound();
        return;
    }

    renderCarDetails();
    setupGallery();
    populateBookingForm();

    // Hide loading spinner
    const loader = document.getElementById('loadingCar');
    if (loader) loader.style.display = 'none';
}

// Display car details
function renderCarDetails() {
    const container = document.getElementById('carDetailsContent');
    if (!container) return;

    // Update page title
    document.title = `${currentCar.name} - Car Rental Bangladesh | SSL Rent a Car BD`;

    // Build HTML
    const html = `
        <!-- Breadcrumb -->
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item"><a href="fleet.html">Fleet</a></li>
                <li class="breadcrumb-item active" aria-current="page">${currentCar.name}</li>
            </ol>
        </nav>

        <div class="row g-5">
            <!-- Image Gallery -->
            <div class="col-lg-8">
                <div class="car-gallery">
                    <div class="car-gallery-main mb-3">
                        <img id="mainImage" src="${currentCar.images[0]}" alt="${currentCar.name}" class="img-fluid rounded-lg w-100">
                    </div>
                    <div class="car-gallery-thumbnails">
                        ${currentCar.images.map((img, index) => `
                            <div class="car-thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="${img}" alt="${currentCar.name} - View ${index + 1}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Car Information & Booking -->
            <div class="col-lg-4">
                <div class="booking-summary sticky-top">
                    <h2 class="mb-3">${currentCar.name}</h2>
                    <div class="d-flex align-items-center mb-3">
                        <span class="badge bg-primary me-2">${currentCar.category.toUpperCase()}</span>
                        <span class="text-muted">
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-fill text-warning"></i>
                            <i class="bi bi-star-half text-warning"></i>
                            <small>(4.8)</small>
                        </span>
                    </div>

                    <div class="pricing mb-4">
                        <div class="d-flex justify-content-between mb-2">
                            <span>Daily Rate:</span>
                            <span class="fw-bold">৳${currentCar.priceDaily.toLocaleString()}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Weekly Rate:</span>
                            <span class="fw-bold">৳${currentCar.priceWeekly.toLocaleString()}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Monthly Rate:</span>
                            <span class="fw-bold">৳${currentCar.priceMonthly.toLocaleString()}</span>
                        </div>
                        <small class="text-muted">*Includes VAT and insurance</small>
                    </div>

                    <div class="d-grid gap-2">
                        <a href="booking.html?car=${currentCar.id}" class="btn btn-primary btn-lg">
                            <i class="bi bi-calendar-check me-2"></i>Book Now
                        </a>
                        <a href="tel:+8801XXXXXXXX" class="btn btn-outline-primary">
                            <i class="bi bi-telephone me-2"></i>Call for Inquiry
                        </a>
                    </div>

                    <hr class="my-4">

                    <!-- Quick Specs -->
                    <h5 class="mb-3">Quick Specs</h5>
                    <div class="row g-2">
                        <div class="col-6">
                            <small class="text-muted">Transmission</small>
                            <p class="mb-0">${currentCar.specs.transmission}</p>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Fuel Type</small>
                            <p class="mb-0">${currentCar.specs.fuelType}</p>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Seats</small>
                            <p class="mb-0">${currentCar.specs.seats} Persons</p>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Luggage</small>
                            <p class="mb-0">${currentCar.specs.luggage} Bags</p>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Mileage</small>
                            <p class="mb-0">${currentCar.specs.mileage}</p>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Engine</small>
                            <p class="mb-0">${currentCar.specs.engine}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Full Description -->
        <div class="row mt-5">
            <div class="col-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">
                        <h4 class="mb-3">About This Car</h4>
                        <p class="lead text-muted">${currentCar.description}</p>

                        <h5 class="mt-4 mb-3">Features & Amenities</h5>
                        <div class="row">
                            ${currentCar.features.map(feature => `
                                <div class="col-md-4 col-sm-6 mb-2">
                                    <i class="bi bi-check-circle-fill text-success me-2"></i>${feature}
                                </div>
                            `).join('')}
                        </div>

                        <h5 class="mt-4 mb-3">Complete Specifications</h5>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td class="fw-bold" width="30%">Make</td>
                                        <td>${currentCar.specs.make}</td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Model</td>
                                        <td>${currentCar.specs.model}</td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Year</td>
                                        <td>${currentCar.specs.year}</td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Fuel Type</td>
                                        <td>${currentCar.specs.fuelType}</td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Transmission</td>
                                        <td>${currentCar.specs.transmission}</td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Seating Capacity</td>
                                        <td>${currentCar.specs.seats} Persons</td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Luggage Capacity</td>
                                        <td>${currentCar.specs.luggage} Large Bags</td>
                                    </tr>
                                    <tr>
                                        <td class="fw-bold">Air Conditioning</td>
                                        <td>${currentCar.specs.ac}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

// Setup image gallery functionality
function setupGallery() {
    const thumbnails = document.querySelectorAll('.car-thumbnail');
    const mainImage = document.getElementById('mainImage');

    if (!thumbnails.length || !mainImage) return;

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            // Update main image
            mainImage.src = currentCar.images[index];

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            currentImageIndex = index;
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        }
    });
}

// Navigate gallery with arrow keys
function navigateImage(direction) {
    currentImageIndex = (currentImageIndex + direction + currentCar.images.length) % currentCar.images.length;
    document.getElementById('mainImage').src = currentCar.images[currentImageIndex];

    const thumbnails = document.querySelectorAll('.car-thumbnail');
    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnails[currentImageIndex].classList.add('active');
}

// Populate booking form with car details
function populateBookingForm() {
    const carSelect = document.getElementById('carSelect');
    if (!carSelect) return;

    // Add current car to select if booking page linked
    const option = document.createElement('option');
    option.value = currentCar.id;
    option.textContent = currentCar.name;
    option.selected = true;
    carSelect.appendChild(option);

    // Set transmission display
    const transmissionInput = document.getElementById('transmissionType');
    if (transmissionInput) {
        transmissionInput.value = currentCar.specs.transmission;
    }
}

// Display car not found message
function displayCarNotFound() {
    const container = document.getElementById('carDetailsContent');
    if (container) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-car-front-fill text-muted display-1 mb-3"></i>
                <h2>Car Not Found</h2>
                <p class="text-muted mb-4">The car you're looking for doesn't exist or has been removed.</p>
                <a href="fleet.html" class="btn btn-primary">Browse Our Fleet</a>
            </div>
        `;
    }

    const loader = document.getElementById('loadingCar');
    if (loader) loader.style.display = 'none';
}

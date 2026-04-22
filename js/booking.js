// ========================================
// RENTCARBD - Booking JavaScript
// Frontend-only: saves to localStorage
// ========================================

let selectedCar = null;
let rentalDays = 0;

// Bangladesh Location Data
const bangladeshLocations = {
    "Dhaka Division": {
        districts: {
            "Dhaka": {
                areas: ["Dhanmondi", "Gulshan", "Banani", "Uttara", "Mirpur", "Motijheel", "Old Dhaka", "Panthapath", "Farmgate", "Bashundhara", "Badda", "Mohammadpur", "Lalmatia", "Green Road", "Rampura"]
            },
            "Faridpur": {
                areas: ["Faridpur Sadar", "Boalmari", "Alfadanga", "Madhukhali", "Bhanga", "Nagarkanda", "Saltha", "Charbhadrasan", "Sadarpur"]
            },
            "Gazipur": {
                areas: ["Gazipur Sadar", "Tongi", "Sreepur", "Kaliakair", "Kaliganj", "Rupganj", "Daudkandi"]
            },
            "Gopalganj": {
                areas: ["Gopalganj Sadar", "Tungipara", "Kotalipara", "Muksudpur", "Kashiani"]
            },
            "Kishoreganj": {
                areas: ["Kishoreganj Sadar", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Pakundia", "Tarail"]
            },
            "Madaripur": {
                areas: ["Madaripur Sadar", "Shibchar", "Kalkini", "Rajoir", "Dasar"]
            },
            "Manikganj": {
                areas: ["Manikganj Sadar", "Saturia", "Singair", "Shibali", "Harirampur"]
            },
            "Munshiganj": {
                areas: ["Munshiganj Sadar", "Sreenagar", "Sirajdikhan", "Louhajanj", "Gajaria", "Tongibari"]
            },
            "Narayanganj": {
                areas: ["Narayanganj Sadar", "Adamjinagar", "Araihazar", "Rupganj", "Sonargaon"]
            },
            "Narsingdi": {
                areas: ["Narsingdi Sadar", "Palash", "Shibpur", "Narayanganj", "Belabo", "Monohardi"]
            },
            "Rajbari": {
                areas: ["Rajbari Sadar", "Baliakandi", "Pangsha", "Kalukhali", "Goalanda"]
            },
            "Shariatpur": {
                areas: ["Shariatpur Sadar", "Naria", "Zajira", "Bhedorganj", "Damudya"]
            },
            "Tangail": {
                areas: ["Tangail Sadar", "Madhupur", "Ghatail", "Sakhipur", "Basail", "Gopalpur", "Dhanbari", "Kalihati", "Nagarpur"]
            }
        }
    },
    "Chittagong Division": {
        districts: {
            "Bandarban": {
                areas: ["Bandarban Sadar", "Lama", "Ali Kadam", "Naikhongchhari", "Ruma", "Thanchi"]
            },
            "Brahmanbaria": {
                areas: ["Brahmanbaria Sadar", "Ashuganj", "Banchharampur", "Bijoynagar", "Nabinagar", "Sarail", "Akhaura", "Kasba", "Shahbazpur"]
            },
            "Chandpur": {
                areas: ["Chandpur Sadar", "Haimchar", "Kachua", "Shahrasti", "Matlab", "Hajiganj", "Faridganj"]
            },
            "Chittagong": {
                areas: ["Chittagong Sadar", "Double Mooring", "Panchlaish", "Pahartali", "Bayazid", "Kotwali", "Halishahar", "Bandar", "Patenga", "Satkania", "Lohagara", "Banshkhali", "Anwara", "Chandroghona"]
            },
            "Cumilla": {
                areas: ["Cumilla Sadar", "Laksam", "Muradnagar", "Chandina", "Debidwar", "Barura", "Brahmanpara", "Burichang", "Nangalkot", "Monohargonj"]
            },
            "Cox's Bazar": {
                areas: ["Cox's Bazar Sadar", "Teknaf", "Ukhiya", "Maheshkhali", "Pekua", "Ramu", "Chakaria"]
            },
            "Feni": {
                areas: ["Feni Sadar", "Sonagazi", "Fulgazi", "Chhagalnaiya", "Daganbhuiyan"]
            },
            "Khagrachari": {
                areas: ["Khagrachari Sadar", "Matiranga", "Ramgarh", "Laxmichhari", "Mohalchari"]
            },
            "Lakshmipur": {
                areas: ["Lakshmipur Sadar", "Ramgati", "Kamalnagar", "Raipur", "Basudevpur"]
            },
            "Noakhali": {
                areas: ["Noakhali Sadar", "Subarnachar", "Hatia", "Sonaimuri", "Kabirhat", "Companiganj"]
            },
            "Rangamati": {
                areas: ["Rangamati Sadar", "Kaptai", "Baghaichhari", "Barkal", "Juraichhari", "Rajasthali"]
            }
        }
    },
    "Rajshahi Division": {
        districts: {
            "Bogura": {
                areas: ["Bogura Sadar", "Shibganj", "Chakhar", "Dhaparia", "Kahaloo", "Nandigram", "Shajahanpur", "Sonatola"]
            },
            "Jaipurhat": {
                areas: ["Jaipurhat Sadar", "Kalai", "Khetlal", "Shailkupa"]
            },
            "Naogaon": {
                areas: ["Naogaon Sadar", "Mohadevpur", "Manda", "Niamatpur", "Atrai", "Raninagar", "Patnitala", "Dhamoirhat"]
            },
            "Natore": {
                areas: ["Natore Sadar", "Baraigram", "Gurudaspur", "Lalpur", "Singra", "Bogra"]
            },
            "Nawabganj": {
                areas: ["Nawabganj Sadar", "Chapai Nawabganj", "Gomostapur", "Nachole", "Atgharia"]
            },
            "Pabna": {
                areas: ["Pabna Sadar", "Ishwardi", "Bhangura", "Chatmohar", "Santhia", "Sujanagar", "Faridpur"]
            },
            "Rajshahi": {
                areas: ["Rajshahi Sadar", "Kashiadanga", "Boalia", "Matihar", "Paba", "Godagari", "Tanore", "Durgapur"]
            },
            "Sirajganj": {
                areas: ["Sirajganj Sadar", "Shahjadpur", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Tarash"]
            }
        }
    },
    "Khulna Division": {
        districts: {
            "Bagerhat": {
                areas: ["Bagerhat Sadar", "Fakirhat", "Mollahat", "Chitalmari", "Sarankhola", "Morrelganj", "Kachua"]
            },
            "Chuadanga": {
                areas: ["Chuadanga Sadar", "Alamdanga", "Chuadanga", "Jibannagar"]
            },
            "Jashore": {
                areas: ["Jashore Sadar", "Kotchandpur", "Maheshpur", "Sharsha", "Abhaynagar", "Munshiganj", "Jhikargachha", "Chanchra"]
            },
            "Jhenaidah": {
                areas: ["Jhenaidah Sadar", "Kotchandpur", "Maheshpur", "Sharsha", "Kaliganj", "Harinakundu"]
            },
            "Khulna": {
                areas: ["Khulna Sadar", "Sonadanga", "Khalishpur", "Daulatpur", "Dighalia", "Rupsha", "Batiaghata", "Dumuria", "Koyra", "Paikgacha"]
            },
            "Kushtia": {
                areas: ["Kushtia Sadar", "Abhaynagar", "Bheramara", "Mirpur", "Kumarkhali"]
            },
            "Magura": {
                areas: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"]
            },
            "Meherpur": {
                areas: ["Meherpur Sadar", "Gangni", "Mujibnagar"]
            },
            "Narail": {
                areas: ["Narail Sadar", "Lohagara", "Kalia", "Bagerhat"]
            },
            "Satkhira": {
                areas: ["Satkhira Sadar", "Kaliganj", "Debhata", "Tala", "Shyamnagar", "Assasuni"]
            }
        }
    },
    "Barisal Division": {
        districts: {
            "Barguna": {
                areas: ["Barguna Sadar", "Amtali", "Taltali", "Bamna", "Banaripara", "Betagi"]
            },
            "Barisal": {
                areas: ["Barisal Sadar", "Babuganj", "Wazirpur", "Banaripara", "Bakerganj", "Muladi", "Mehendiganj", "Gournadi", "Agailjhara"]
            },
            "Bhola": {
                areas: ["Bhola Sadar", "Burhanuddin", "Tazumuddin", "Char Fasson", "Lalmohan", "Daulatkhan"]
            },
            "Jhalokati": {
                areas: ["Jhalokati Sadar", "Kathalia", "Nalchira", "Rajapur", "Bhandaria"]
            },
            "Patuakhali": {
                areas: ["Patuakhali Sadar", "Dumki", "Mathbaria", "Rangabali", "Bauphal", "Galachipa", "Dashmina", "Kakchira"]
            },
            "Pirojpur": {
                areas: ["Pirojpur Sadar", "Kawkhali", "Zianagar", "Nesarabad", "Tungipara"]
            }
        }
    },
    "Sylhet Division": {
        districts: {
            "Habiganj": {
                areas: ["Habiganj Sadar", "Ajmiriganj", "Baniachang", "Lakhai", "Madhabpur", "Nabiganj", "Chunarughat"]
            },
            "Maulvibazar": {
                areas: ["Maulvibazar Sadar", "Barlekha", "Juri", "Kulaura", "Rajnagar", "Sreemangal"]
            },
            "Sunamganj": {
                areas: ["Sunamganj Sadar", "Shantiganj", "Jagannathpur", "Dowarabazar", "Chhatak", "Tahirpur", "Dharampasha"]
            },
            "Sylhet": {
                areas: ["Sylhet Sadar", "Beanibazar", "Golapganj", "Awamiya", "Bishwanath", "Dakshin Surma", "Fenchuganj", "Kanaighat", "Zakiganj"]
            }
        }
    },
    "Rangpur Division": {
        districts: {
            "Dinajpur": {
                areas: ["Dinajpur Sadar", "Birampur", "Birganj", "Kaharole", "Parbatipur", "Chirirbandar", "Fulbari", "Ghoraghat", "Hakimpur"]
            },
            "Gaibandha": {
                areas: ["Gaibandha Sadar", "Gobindaganj", "Palashbari", "Ghior", "Sundarganj", "Saghata", "Fulchhari"]
            },
            "Kurigram": {
                areas: ["Kurigram Sadar", "Chilmari", "Rajarhat", "Phulbari", "Nageshwari", "Chillmari", "Ulipur"]
            },
            "Lalmonirhat": {
                areas: ["Lalmonirhat Sadar", "Kaliganj", "Aditmari", "Hatibandha", "Patgram"]
            },
            "Nilphamari": {
                areas: ["Nilphamari Sadar", "Saidpur", "Domar", "Jaldhaka", "Kishoreganj", "Dimla"]
            },
            "Panchagarh": {
                areas: ["Panchagarh Sadar", "Boda", "Debiganj", "Atwari", "Tetulia"]
            },
            "Rangpur": {
                areas: ["Rangpur Sadar", "Badarganj", "Mithapukur", "Pirgachha", "Taraganj", "Kaunia", "Gangachara"]
            },
            "Thakurgaon": {
                areas: ["Thakurgaon Sadar", "Baliadangi", "Haripur", "Ranisankail", "Pirganj"]
            }
        }
    },
    "Mymensingh Division": {
        districts: {
            "Jamalpur": {
                areas: ["Jamalpur Sadar", "Melandaha", "Islampur", "Sharishabari", "Madarganj", "Bokshiganj"]
            },
            "Mymensingh": {
                areas: ["Mymensingh Sadar", "Muktagachha", "Bhaluka", "Trishal", "Bhaluka", "Gouripur", "Phulpur", "Haluaghat", "Nandail"]
            },
            "Netrokona": {
                areas: ["Netrokona Sadar", "Atpara", "Chhaila", "Madan", "Kendua", "Durgapur", "Kalmakanda", "Barhatta", "Mohanganj"]
            },
            "Sherpur": {
                areas: ["Sherpur Sadar", "Nalitabari", "Nokla", "Jhenaigati", "Sreebardi"]
            }
        }
    }
};

function initializeCarSelect() {
    const carSelect = document.getElementById('carSelect');
    if (!carSelect) return;

    const availableCars = carsData.filter(car => car.available);

    availableCars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.name} - ৳${car.priceDaily.toLocaleString()}/day`;
        option.dataset.price = car.priceDaily;
        option.dataset.weekly = car.priceWeekly;
        option.dataset.monthly = car.priceMonthly;
        option.dataset.transmission = car.specs.transmission;
        option.dataset.fuel = car.specs.fuelType;
        option.dataset.seats = car.specs.seats;
        option.dataset.image = car.images[car.images.length - 1] || car.images[0];
        option.dataset.description = car.description;
        carSelect.appendChild(option);
    });

    carSelect.addEventListener('change', function() {
        const carId = parseInt(this.value);
        selectCar(carId);
    });
}

function selectCar(carId) {
    const car = carsData.find(c => c.id === carId);
    const carSelect = document.getElementById('carSelect');

    if (!car) {
        // Hide preview
        document.getElementById('selectedCarDetails').style.display = 'none';
        document.getElementById('transmissionType').value = '';
        selectedCar = null;
        if (carSelect) carSelect.value = '';
        document.getElementById('submitBtn').disabled = true;
        updatePriceDisplay(0, 0, 0);
        return;
    }

    selectedCar = car;

    // Set dropdown selection
    if (carSelect) carSelect.value = carId;

    // Show preview
    const preview = document.getElementById('selectedCarDetails');
    preview.style.display = 'block';

    document.getElementById('carImage').src = car.images[car.images.length - 1] || car.images[0];
    document.getElementById('carName').textContent = car.name;
    document.getElementById('carTransmission').textContent = car.specs.transmission;
    document.getElementById('carFuel').textContent = car.specs.fuelType;
    document.getElementById('carSeats').textContent = `${car.specs.seats} Seats`;
    document.getElementById('carPrice').innerHTML = `৳${car.priceDaily.toLocaleString()}<small class="text-muted">/day</small>`;
    document.getElementById('carDescription').textContent = car.description;

    // Set transmission input
    document.getElementById('transmissionType').value = car.specs.transmission;

    // Enable submit
    document.getElementById('submitBtn').disabled = false;

    updatePriceCalculation();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingPage();
    initializeLocationSelectors();
});

function initializeBookingPage() {
    initializeCarSelect();
    initializeDatePickers();
    updatePriceCalculation();

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Disable submit button until car is selected
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const preselectedCar = urlParams.get('car');
    if (preselectedCar) {
        selectCar(parseInt(preselectedCar));
    }
}



function initializeDatePickers() {
    const pickupInput = document.getElementById('pickupDate');
    const dropoffInput = document.getElementById('dropoffDate');

    if (!pickupInput || !dropoffInput) return;

    const today = new Date().toISOString().split('T')[0];
    pickupInput.min = today;
    pickupInput.value = today;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dropoffInput.min = today;
    dropoffInput.value = tomorrow.toISOString().split('T')[0];

    pickupInput.addEventListener('change', function() {
        const pickup = new Date(this.value);
        const minDropoff = new Date(pickup);
        minDropoff.setDate(minDropoff.getDate() + 1);
        dropoffInput.min = minDropoff.toISOString().split('T')[0];
        if (new Date(dropoffInput.value) <= pickup) {
            dropoffInput.value = minDropoff.toISOString().split('T')[0];
        }
        updatePriceCalculation();
    });

    dropoffInput.addEventListener('change', updatePriceCalculation);
}

function calculateRentalDays() {
    const pickup = document.getElementById('pickupDate').value;
    const dropoff = document.getElementById('dropoffDate').value;
    if (!pickup || !dropoff) return 0;

    const start = new Date(pickup);
    const end = new Date(dropoff);
    if (end <= start) return 0;

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
}

function updatePriceCalculation() {
    if (!selectedCar) return;

    rentalDays = calculateRentalDays();
    const daysInput = document.getElementById('rentalDays');
    if (daysInput) {
        daysInput.value = `${rentalDays} ${rentalDays === 1 ? 'day' : 'days'}`;
    }

    let dailyRate = selectedCar.priceDaily;
    let discount = 0;

    if (rentalDays >= 30) {
        dailyRate = selectedCar.priceMonthly / 30;
        discount = 20;
    } else if (rentalDays >= 7) {
        dailyRate = selectedCar.priceWeekly / 7;
        discount = 10;
    }

    const subtotal = dailyRate * rentalDays;
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal - discountAmount;

    updatePriceDisplay(subtotal, discountAmount, total);
}

function updatePriceDisplay(subtotal, discountAmount, total) {
    const dailyRateDisplay = document.getElementById('dailyRateDisplay');
    const daysDisplay = document.getElementById('daysDisplay');
    const subtotalDisplay = document.getElementById('subtotalDisplay');
    const totalDisplay = document.getElementById('totalDisplay');
    const carNameDisplay = document.getElementById('selectedCarName');

    if (dailyRateDisplay && selectedCar) {
        dailyRateDisplay.textContent = formatPrice(selectedCar.priceDaily);
    }
    if (carNameDisplay && selectedCar) {
        carNameDisplay.textContent = selectedCar.name;
    }
    if (daysDisplay) {
        daysDisplay.textContent = rentalDays === 1 ? '1 day' : `${rentalDays} days`;
    }
    if (subtotalDisplay) subtotalDisplay.textContent = formatPrice(Math.round(subtotal));
    if (totalDisplay) {
        totalDisplay.textContent = formatPrice(Math.round(total));
    }

    const discountDisplay = document.getElementById('discountDisplay');
    if (discountDisplay) {
        discountDisplay.textContent = discountAmount > 0 ? `-${formatPrice(Math.round(discountAmount))}` : '-৳0';
        discountDisplay.style.color = discountAmount > 0 ? '#28a745' : '#6c757d';
    }
}

function initializeLocationSelectors() {
    const pickupDivision = document.getElementById('pickupDivision');
    const dropoffDivision = document.getElementById('dropoffDivision');

    if (!pickupDivision || !dropoffDivision) return;

    const divisions = Object.keys(bangladeshLocations);

    divisions.forEach(division => {
        const option1 = document.createElement('option');
        option1.value = division;
        option1.textContent = division;
        pickupDivision.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = division;
        option2.textContent = division;
        dropoffDivision.appendChild(option2);
    });

    pickupDivision.addEventListener('change', function() {
        const selectedDivision = this.value;
        enableDistrictDropdown('pickup', selectedDivision);
        resetDownstream('pickup', 'district');
    });

    document.getElementById('pickupDistrict').addEventListener('change', function() {
        const selectedDistrict = this.value;
        enableUpazilaDropdown('pickup', selectedDistrict);
    });

    dropoffDivision.addEventListener('change', function() {
        const selectedDivision = this.value;
        enableDistrictDropdown('dropoff', selectedDivision);
        resetDownstream('dropoff', 'district');
    });

    document.getElementById('dropoffDistrict').addEventListener('change', function() {
        const selectedDistrict = this.value;
        enableUpazilaDropdown('dropoff', selectedDistrict);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const pickupLocation = urlParams.get('pickup');
    const dropoffLocation = urlParams.get('dropoff');

    if (pickupLocation) {
        const parts = pickupLocation.split('|');
        if (parts.length === 3) setLocationFromParts('pickup', parts[0], parts[1], parts[2]);
    }
    if (dropoffLocation) {
        const parts = dropoffLocation.split('|');
        if (parts.length === 3) setLocationFromParts('dropoff', parts[0], parts[1], parts[2]);
    }
}

function enableDistrictDropdown(type, division) {
    const districtSelect = document.getElementById(`${type}District`);
    const upazilaSelect = document.getElementById(`${type}Upazila`);

    districtSelect.innerHTML = '<option value="">Select District...</option>';
    upazilaSelect.innerHTML = '<option value="">Select Area/Upazila...</option>';
    upazilaSelect.disabled = true;

    if (!division || !bangladeshLocations[division]) {
        districtSelect.disabled = true;
        return;
    }

    districtSelect.disabled = false;
    const districts = Object.keys(bangladeshLocations[division].districts);
    districts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

function enableUpazilaDropdown(type, district) {
    const divisionSelect = document.getElementById(`${type}Division`);
    const division = divisionSelect.value;
    const upazilaSelect = document.getElementById(`${type}Upazila`);

    upazilaSelect.innerHTML = '<option value="">Select Area/Upazila...</option>';

    if (!division || !district || !bangladeshLocations[division] || !bangladeshLocations[division].districts[district]) {
        upazilaSelect.disabled = true;
        return;
    }

    upazilaSelect.disabled = false;
    const areas = bangladeshLocations[division].districts[district].areas;
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area;
        option.textContent = area;
        upazilaSelect.appendChild(option);
    });
}

function resetDownstream(type) {
    const districtSelect = document.getElementById(`${type}District`);
    const upazilaSelect = document.getElementById(`${type}Upazila`);
    districtSelect.value = '';
    upazilaSelect.value = '';
    upazilaSelect.disabled = true;
}

function setLocationFromParts(type, division, district, area) {
    const divisionSelect = document.getElementById(`${type}Division`);
    const districtSelect = document.getElementById(`${type}District`);
    const upazilaSelect = document.getElementById(`${type}Upazila`);

    divisionSelect.value = division;
    enableDistrictDropdown(type, division);
    districtSelect.value = district;
    enableUpazilaDropdown(type, district);
    upazilaSelect.value = area;
}

function getFormattedLocation(type) {
    const division = document.getElementById(`${type}Division`).value;
    const district = document.getElementById(`${type}District`).value;
    const area = document.getElementById(`${type}Upazila`).value;
    if (!division || !district || !area) return '';
    return `${area}, ${district}, ${division}`;
}

function validateLocationCompleteness(type) {
    const division = document.getElementById(`${type}Division`).value;
    const district = document.getElementById(`${type}District`).value;
    const area = document.getElementById(`${type}Upazila`).value;
    return division && district && area;
}

function resetLocationSelectors() {
    ['pickup', 'dropoff'].forEach(type => {
        document.getElementById(`${type}Division`).value = '';
        document.getElementById(`${type}District`).innerHTML = '<option value="">Select District...</option>';
        document.getElementById(`${type}District`).disabled = true;
        document.getElementById(`${type}Upazila`).innerHTML = '<option value="">Select Area/Upazila...</option>';
        document.getElementById(`${type}Upazila`).disabled = true;
    });
}

var lastBooking = null;

function handleBookingSubmit(e) {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        showToast('Please fill in all required fields correctly.', 'error');
        return;
    }

    if (!selectedCar) {
        showToast('Please select a car.', 'error');
        return;
    }

    if (!validateLocationCompleteness('pickup') || !validateLocationCompleteness('dropoff')) {
        showToast('Please complete all location selections.', 'error');
        return;
    }

    const pickupDateVal = document.getElementById('pickupDate').value;
    const dropoffDateVal = document.getElementById('dropoffDate').value;
    if (new Date(pickupDateVal) >= new Date(dropoffDateVal)) {
        showToast('Drop-off date must be after pickup date.', 'error');
        return;
    }

    const bookingData = {
        id: generateBookingRef(),
        car: selectedCar,
        customer: {
            name: form.fullName.value,
            email: form.email.value,
            phone: form.phone.value,
            nid: form.nidPassport.value
        },
        pickup: {
            division: document.getElementById('pickupDivision').value,
            district: document.getElementById('pickupDistrict').value,
            area: document.getElementById('pickupUpazila').value,
            location: getFormattedLocation('pickup'),
            date: pickupDateVal
        },
        dropoff: {
            division: document.getElementById('dropoffDivision').value,
            district: document.getElementById('dropoffDistrict').value,
            area: document.getElementById('dropoffUpazila').value,
            location: getFormattedLocation('dropoff'),
            date: dropoffDateVal
        },
        days: rentalDays,
        total: calculateTotal(),
        timestamp: new Date().toISOString()
    };

    lastBooking = bookingData;

    const bookings = getBookings();
    bookings.push(bookingData);
    saveBookings(bookings);

    showBookingConfirmation(bookingData);

    form.reset();
    form.classList.remove('was-validated');
    resetLocationSelectors();
    
    // Reset car selection
    const carSelect = document.getElementById('carSelect');
    if (carSelect) carSelect.value = '';
    document.getElementById('selectedCarDetails').style.display = 'none';
    selectedCar = null;
    document.getElementById('submitBtn').disabled = true;
    updatePriceDisplay(0, 0, 0);
}

function calculateTotal() {
    if (!selectedCar) return 0;

    let dailyRate = selectedCar.priceDaily;
    if (rentalDays >= 30) {
        dailyRate = selectedCar.priceMonthly / 30;
    } else if (rentalDays >= 7) {
        dailyRate = selectedCar.priceWeekly / 7;
    }

    const subtotal = dailyRate * rentalDays;
    return Math.round(subtotal * (1 - (rentalDays >= 30 ? 0.20 : rentalDays >= 7 ? 0.10 : 0)));
}

function showBookingConfirmation(booking) {
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const refElement = document.getElementById('bookingRef');
    if (refElement) refElement.textContent = booking.id;

    // Set view invoice link
    const viewLink = document.getElementById('viewInvoiceLink');
    if (viewLink) {
        viewLink.href = `invoice.html?ref=${booking.id}`;
    }

    // Generate QR Code for the booking reference
    generateQRCode(booking.id);

    // Prepare and show download button
    setTimeout(function() {
        prepareInvoice(booking);
        document.getElementById('invoiceDownloadContainer').style.display = 'block';
    }, 300);

    modal.show();
}

function getBookings() {
    return getFromStorage('rentcarbd_bookings') || [];
}

function saveBookings(bookings) {
    saveToStorage('rentcarbd_bookings', bookings);
}

function generateBookingRef() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `RENT-${timestamp}-${random}`;
}

function formatPrice(price) {
    return '৳' + price.toLocaleString('en-IN');
}

function showToast(message, type = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const bgClass = {
        'success': 'bg-success',
        'error': 'bg-danger',
        'warning': 'bg-warning',
        'info': 'bg-info'
    }[type] || 'bg-info';

    const toastHtml = `
        <div id="${toastId}" class="toast ${bgClass} text-white" role="alert">
            <div class="toast-header ${bgClass} text-white">
                <strong class="me-auto">Notification</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">${message}</div>
        </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();

    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}

// ===== INVOICE & PDF GENERATION =====

// Generate QR Code for booking reference
function generateQRCode(bookingRef) {
    const qrContainer = document.getElementById('invoiceQRCode');
    if (!qrContainer) return;

    qrContainer.innerHTML = '';

    // Create a temporary div for QR generation (must be in DOM and visible for proper canvas generation)
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'position:fixed;left:0;top:0;width:120px;height:120px;z-index:999999;background:white;padding:10px;';
    tempDiv.style.visibility = 'hidden';
    document.body.appendChild(tempDiv);

    // Generate QR code using qrcodejs library
        try {
            new QRCode(tempDiv, {
                text: `Booking Ref: ${bookingRef}\nStatus: Confirmed\nCompany: SSL Rent a Car BD`,
                width: 120,
                height: 120,
                colorDark: '#667eea',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M
            });

            // Wait for QR code to render, then move it (500ms for reliable canvas generation)
            setTimeout(() => {
                const qrElement = tempDiv.querySelector('canvas, img');
                if (qrElement) {
                    qrContainer.appendChild(qrElement);
                }
                tempDiv.remove();
            }, 500);
        } catch (e) {
        console.error('QR generation failed:', e);
        tempDiv.remove();
        qrContainer.textContent = bookingRef;
    }
}

// Populate invoice template with booking data
function prepareInvoice(booking) {
    const now = new Date();

    document.getElementById('invoiceDate').textContent = formatDateForInvoice(now);
    document.getElementById('invoiceRef').textContent = booking.id;
    document.getElementById('invoiceName').textContent = booking.customer.name;
    document.getElementById('invoiceEmail').textContent = booking.customer.email;
    document.getElementById('invoicePhone').textContent = booking.customer.phone;
    document.getElementById('invoiceNID').textContent = booking.customer.nid;

    const pickupDate = new Date(booking.pickup.date);
    const dropoffDate = new Date(booking.dropoff.date);
    document.getElementById('invoicePickupDate').textContent = formatDateForInvoice(pickupDate);
    document.getElementById('invoiceDropoffDate').textContent = formatDateForInvoice(dropoffDate);
    document.getElementById('invoiceDays').textContent = `${booking.days} day(s)`;
    document.getElementById('invoicePickupLocation').textContent = booking.pickup.location;
    document.getElementById('invoiceDropoffLocation').textContent = booking.dropoff.location;

    document.getElementById('invoiceCarName').textContent = booking.car.name;
    document.getElementById('invoiceTransmission').textContent = booking.car.specs.transmission;
    document.getElementById('invoiceFuel').textContent = booking.car.specs.fuelType;
    document.getElementById('invoiceSeats').textContent = `${booking.car.specs.seats} Seats`;
    document.getElementById('invoiceCarPrice').textContent = `৳${booking.car.priceDaily.toLocaleString()}`;

    // Calculate subtotal from stored total
    let discountRate = 0;
    if (booking.days >= 30) {
        discountRate = 0.20;
    } else if (booking.days >= 7) {
        discountRate = 0.10;
    }
    const subtotal = booking.total / (1 - discountRate);
    const discountAmount = subtotal - booking.total;

    document.getElementById('invoiceDayCount').textContent = booking.days;
    document.getElementById('invoiceSubtotal').textContent = formatPrice(Math.round(subtotal));
    document.getElementById('invoiceDiscount').textContent = discountAmount > 0 ? `-${formatPrice(Math.round(discountAmount))}` : '-৳0';

    const discountRow = document.getElementById('discountRow');
    if (discountRow) {
        discountRow.style.display = discountAmount > 0 ? 'flex' : 'none';
    }

    document.getElementById('invoiceTotal').textContent = formatPrice(Math.round(booking.total));

    document.getElementById('invoiceYear').textContent = now.getFullYear();

    // Attach download button click handler
    const downloadBtn = document.getElementById('downloadInvoiceBtn');
    if (downloadBtn) {
        downloadBtn.onclick = downloadInvoice;
    }
}

// Download invoice as PDF
function downloadInvoice() {
    const qrContainer = document.getElementById('invoiceQRCode');

    // Main PDF generation routine
    function performDownload() {
        const invoiceElement = document.getElementById('invoiceTemplate');
        const fileName = `SSL_Rent_a_Car_Invoice_${lastBooking.id}.pdf`;

        // Store original styles for outer wrapper and inner container
        const outerOriginal = {
            display: invoiceElement.style.display,
            position: invoiceElement.style.position,
            left: invoiceElement.style.left,
            top: invoiceElement.style.top,
            width: invoiceElement.style.width,
            padding: invoiceElement.style.padding,
            margin: invoiceElement.style.margin,
            maxWidth: invoiceElement.style.maxWidth,
            overflow: invoiceElement.style.overflow
        };

        // Get inner container (first child div with border/padding)
        const innerDiv = invoiceElement.querySelector('div');
        const innerOriginal = innerDiv ? {
            maxWidth: innerDiv.style.maxWidth,
            margin: innerDiv.style.margin,
            width: innerDiv.style.width,
            padding: innerDiv.style.padding
        } : null;

        // Make visible but off-screen for capture, set A4 dimensions
        invoiceElement.style.display = 'block';
        invoiceElement.style.position = 'absolute';
        invoiceElement.style.left = '-9999px';
        invoiceElement.style.top = '0';
        invoiceElement.style.width = '210mm'; // A4 width
        invoiceElement.style.maxWidth = '210mm';
        invoiceElement.style.margin = '0';
        invoiceElement.style.overflow = 'visible';

        if (innerDiv) {
            innerDiv.style.maxWidth = '190mm';
            innerDiv.style.width = '100%';
            innerDiv.style.margin = '0 auto';
        }

        // Configuration for A4 PDF
        const opt = {
            margin: 0,
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: false,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 1200,
                windowHeight: invoiceElement.scrollHeight,
                onclone: function(clonedDoc) {
                    const qr = clonedDoc.getElementById('invoiceQRCode');
                    if (qr) {
                        qr.style.visibility = 'visible';
                        qr.style.opacity = '1';
                    }
                }
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait',
                compress: true
            }
        };

        setTimeout(function() {
            html2pdf().set(opt).from(invoiceElement).save().then(() => {
                // Restore original styles
                Object.assign(invoiceElement.style, outerOriginal);
                if (innerDiv && innerOriginal) {
                    Object.assign(innerDiv.style, innerOriginal);
                }
            }).catch(err => {
                console.error('PDF generation error:', err);
                Object.assign(invoiceElement.style, outerOriginal);
                if (innerDiv && innerOriginal) {
                    Object.assign(innerDiv.style, innerOriginal);
                }
                alert('Failed to generate PDF. Please try again or use Print.');
            });
        }, 800);
    }

    // If QR code not yet generated, wait for it (poll every 200ms, max 2.5s)
    if (qrContainer && qrContainer.children.length === 0) {
        let attempts = 0;
        const maxAttempts = 15;
        const interval = setInterval(() => {
            if (qrContainer.children.length > 0 || attempts >= maxAttempts) {
                clearInterval(interval);
                performDownload();
            }
            attempts++;
        }, 200);
    } else {
        performDownload();
    }
}

// Format date for invoice display (25 Dec 2026)
function formatDateForInvoice(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

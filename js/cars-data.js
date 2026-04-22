// ========================================
// RENTCARBD - Car Database
// Mock data for car inventory
// ========================================

const carsData = [
    {
        id: 1,
        name: "Toyota Corolla 2023",
        slug: "toyota-corolla-2023",
        category: "sedan",
        priceDaily: 3500,
        priceWeekly: 21000,
        priceMonthly: 75000,
        images: [
            "https://placehold.co/800x600/1e88e5/white?text=Toyota+Corolla+2023",
            "https://placehold.co/800x600/1e88e5/white?text=Toyota+Corolla+Interior",
            "https://placehold.co/800x600/1e88e5/white?text=Toyota+Corolla+Exterior",
            "https://placehold.co/800x600/1e88e5/white?text=Toyota+Corolla+Side+View"
        ],
        specs: {
            make: "Toyota",
            model: "Corolla",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 5,
            luggage: 3,
            ac: "Yes",
            engine: "1.8L",
            mileage: "12-14 km/l"
        },
        features: ["Bluetooth", "Backup Camera", "Keyless Entry", "USB Ports", "Cruise Control", "Push Button Start"],
        description: "The Toyota Corolla 2023 is a reliable and fuel-efficient sedan perfect for city commutes and long highway drives. Features modern amenities, comfortable seating for 5, and excellent safety ratings. A popular choice among Bangladeshi families.",
        available: true,
        featured: true
    },
    {
        id: 2,
        name: "Honda Civic 2023",
        slug: "honda-civic-2023",
        category: "sedan",
        priceDaily: 3800,
        priceWeekly: 22800,
        priceMonthly: 82000,
        images: [
            "https://placehold.co/800x600/e53935/white?text=Honda+Civic+2023",
            "https://placehold.co/800x600/e53935/white?text=Honda+Civic+Interior",
            "https://placehold.co/800x600/e53935/white?text=Honda+Civic+Exterior",
            "https://placehold.co/800x600/e53935/white?text=Honda+Civic+Side+View"
        ],
        specs: {
            make: "Honda",
            model: "Civic",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 5,
            luggage: 3,
            ac: "Yes",
            engine: "1.5L Turbo",
            mileage: "11-13 km/l"
        },
        features: ["Bluetooth", "Rear Camera", "Sunroof", "Leather Seats", "Navigation System", "ECON Mode"],
        description: "The Honda Civic 2023 offers sporty performance with excellent fuel economy. Its turbocharged engine provides responsive acceleration while maintaining elegance and comfort. Perfect for executive travel and special occasions.",
        available: true,
        featured: true
    },
    {
        id: 3,
        name: "Mitsubishi Pajero 2022",
        slug: "mitsubishi-pajero-2022",
        category: "suv",
        priceDaily: 6500,
        priceWeekly: 39000,
        priceMonthly: 140000,
        images: [
            "https://placehold.co/800x600/424242/white?text=Mitsubishi+Pajero+2022",
            "https://placehold.co/800x600/424242/white?text=Mitsubishi+Pajero+Interior",
            "https://placehold.co/800x600/424242/white?text=Mitsubishi+Pajero+Exterior",
            "https://placehold.co/800x600/424242/white?text=Mitsubishi+Pajero+Offroad"
        ],
        specs: {
            make: "Mitsubishi",
            model: "Pajero",
            year: 2022,
            fuelType: "Diesel",
            transmission: "Automatic",
            seats: 7,
            luggage: 5,
            ac: "Yes",
            engine: "3.0L V6",
            mileage: "8-10 km/l"
        },
        features: ["4WD", "Rear Diff Lock", "Hill Descent Control", "Touchscreen", "Reverse Camera", "Cruise Control"],
        description: "The Mitsubishi Pajero is a legendary 4x4 SUV built for adventure. With its powerful diesel engine, 7-seater capacity, and advanced off-road capabilities, it's ideal for family trips to Cox's Bazar or hill districts.",
        available: true,
        featured: true
    },
    {
        id: 4,
        name: "Nissan X-Trail 2023",
        slug: "nissan-x-trail-2023",
        category: "suv",
        priceDaily: 5500,
        priceWeekly: 33000,
        priceMonthly: 118000,
        images: [
            "https://placehold.co/800x600/f9a825/white?text=Nissan+X-Trail+2023",
            "https://placehold.co/800x600/f9a825/white?text=Nissan+X-Trail+Interior",
            "https://placehold.co/800x600/f9a825/white?text=Nissan+X-Trail+Exterior",
            "https://placehold.co/800x600/f9a825/white?text=Nissan+X-Trail+Front"
        ],
        specs: {
            make: "Nissan",
            model: "X-Trail",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 7,
            luggage: 4,
            ac: "Yes",
            engine: "2.0L",
            mileage: "10-12 km/l"
        },
        features: ["AWD", "Panoramic Sunroof", "Bose Audio", "Leather Seats", "ProPILOT Assist", "360 Camera"],
        description: "The Nissan X-Trail combines SUV versatility with cutting-edge technology. Its ProPILOT assist system makes highway driving effortless, while the spacious interior accommodates families and luggage comfortably.",
        available: true,
        featured: false
    },
    {
        id: 5,
        name: "Toyota Prius 2022",
        slug: "toyota-prius-2022",
        category: "hatchback",
        priceDaily: 2800,
        priceWeekly: 16800,
        priceMonthly: 60000,
        images: [
            "https://placehold.co/800x600/757575/white?text=Toyota+Prius+2022",
            "https://placehold.co/800x600/757575/white?text=Toyota+Prius+Interior",
            "https://placehold.co/800x600/757575/white?text=Toyota+Prius+Exterior",
            "https://placehold.co/800x600/757575/white?text=Toyota+Prius+Side"
        ],
        specs: {
            make: "Toyota",
            model: "Prius",
            year: 2022,
            fuelType: "Hybrid",
            transmission: "Automatic",
            seats: 5,
            luggage: 3,
            ac: "Yes",
            engine: "1.8L Hybrid",
            mileage: "25-30 km/l"
        },
        features: ["Hybrid System", "Keyless Entry", "Backup Camera", "Bluetooth", "Smart Entry"],
        description: "The Toyota Prius is the ultimate fuel-efficient choice. Its hybrid powertrain delivers exceptional mileage of up to 30 km/l, making it perfect for budget-conscious travelers. Eco-friendly and reliable.",
        available: true,
        featured: false
    },
    {
        id: 6,
        name: "BMW 3 Series 2023",
        slug: "bmw-3-series-2023",
        category: "luxury",
        priceDaily: 8500,
        priceWeekly: 51000,
        priceMonthly: 180000,
        images: [
            "https://placehold.co/800x600/0d47a1/white?text=BMW+3+Series+2023",
            "https://placehold.co/800x600/0d47a1/white?text=BMW+3+Series+Interior",
            "https://placehold.co/800x600/0d47a1/white?text=BMW+3+Series+Exterior",
            "https://placehold.co/800x600/0d47a1/white?text=BMW+3+Series+Front"
        ],
        specs: {
            make: "BMW",
            model: "3 Series",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 5,
            luggage: 2,
            ac: "Yes",
            engine: "2.0L Turbo",
            mileage: "9-11 km/l"
        },
        features: ["Premium Sound", "Navigation", "Leather Interior", "Parking Assist", "Adaptive Cruise", "Lane Assist"],
        description: "Experience luxury with the BMW 3 Series. This executive sedan offers superior driving dynamics, premium craftsmanship, and advanced technology. Perfect for business executives and special occasions.",
        available: true,
        featured: true
    },
    {
        id: 7,
        name: "Hyundai Creta 2023",
        slug: "hyundai-creta-2023",
        category: "suv",
        priceDaily: 4200,
        priceWeekly: 25200,
        priceMonthly: 90000,
        images: [
            "https://placehold.co/800x600/1b5e20/white?text=Hyundai+Creta+2023",
            "https://placehold.co/800x600/1b5e20/white?text=Hyundai+Creta+Interior",
            "https://placehold.co/800x600/1b5e20/white?text=Hyundai+Creta+Exterior",
            "https://placehold.co/800x600/1b5e20/white?text=Hyundai+Creta+Side"
        ],
        specs: {
            make: "Hyundai",
            model: "Creta",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 5,
            luggage: 3,
            ac: "Yes",
            engine: "1.5L",
            mileage: "12-14 km/l"
        },
        features: ["Touchscreen", "Reverse Camera", "Sunroof", "Wireless Charging", "Internet Enabled"],
        description: "The Hyundai Creta is a compact SUV that balances style, comfort, and efficiency. Its modern design, feature-rich interior, and smooth ride make it a popular choice for city and highway driving alike.",
        available: true,
        featured: false
    },
    {
        id: 8,
        name: "Toyota Fortuner 2022",
        slug: "toyota-fortuner-2022",
        category: "suv",
        priceDaily: 7000,
        priceWeekly: 42000,
        priceMonthly: 150000,
        images: [
            "https://placehold.co/800x600/b71c1c/white?text=Toyota+Fortuner+2022",
            "https://placehold.co/800x600/b71c1c/white?text=Toyota+Fortuner+Interior",
            "https://placehold.co/800x600/b71c1c/white?text=Toyota+Fortuner+Exterior",
            "https://placehold.co/800x600/b71c1c/white?text=Toyota+Fortuner+Offroad"
        ],
        specs: {
            make: "Toyota",
            model: "Fortuner",
            year: 2022,
            fuelType: "Diesel",
            transmission: "Automatic",
            seats: 7,
            luggage: 5,
            ac: "Yes",
            engine: "2.8L Diesel",
            mileage: "9-11 km/l"
        },
        features: ["4WD", "7 Seater", "Rear Entertainment", "Ventilated Seats", "Auto Hold", "Terrain Mode"],
        description: "The Toyota Fortuner is a robust 7-seater SUV with commanding road presence. Its powerful diesel engine and 4WD capability make it ideal for family trips and rough terrain adventures.",
        available: true,
        featured: true
    },
    {
        id: 9,
        name: "Suzuki Swift 2023",
        slug: "suzuki-swift-2023",
        category: "hatchback",
        priceDaily: 2200,
        priceWeekly: 13200,
        priceMonthly: 48000,
        images: [
            "https://placehold.co/800x600/ff6f00/white?text=Suzuki+Swift+2023",
            "https://placehold.co/800x600/ff6f00/white?text=Suzuki+Swift+Interior",
            "https://placehold.co/800x600/ff6f00/white?text=Suzuki+Swift+Exterior",
            "https://placehold.co/800x600/ff6f00/white?text=Suzuki+Swift+Side"
        ],
        specs: {
            make: "Suzuki",
            model: "Swift",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Manual",
            seats: 5,
            luggage: 2,
            ac: "Yes",
            engine: "1.2L",
            mileage: "18-22 km/l"
        },
        features: ["Bluetooth", "Power Windows", "Dual Airbags", "ABS"],
        description: "The Suzuki Swift is a compact hatchback perfect for city driving with excellent fuel efficiency. Easy to park, fun to drive, and budget-friendly. Great option for solo travelers or couples.",
        available: true,
        featured: false
    },
    {
        id: 10,
        name: "Mitsubishi Attrage 2022",
        slug: "mitsubishi-attrage-2022",
        category: "sedan",
        priceDaily: 2500,
        priceWeekly: 15000,
        priceMonthly: 55000,
        images: [
            "https://placehold.co/800x600/546e7a/white?text=Mitsubishi+Attrage+2022",
            "https://placehold.co/800x600/546e7a/white?text=Mitsubishi+Attrage+Interior",
            "https://placehold.co/800x600/546e7a/white?text=Mitsubishi+Attrage+Exterior",
            "https://placehold.co/800x600/546e7a/white?text=Mitsubishi+Attrage+Side"
        ],
        specs: {
            make: "Mitsubishi",
            model: "Attrage",
            year: 2022,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 5,
            luggage: 3,
            ac: "Yes",
            engine: "1.2L",
            mileage: "18-20 km/l"
        },
        features: ["Bluetooth", "Keyless Entry", "Reverse Camera", "Eco Mode"],
        description: "The Mitsubishi Attrage is a compact sedan offering excellent fuel economy and comfortable ride quality. Its spacious interior and low maintenance cost make it a practical choice for daily commuting.",
        available: true,
        featured: false
    },
    {
        id: 11,
        name: "Mercedes-Benz C-Class 2023",
        slug: "mercedes-c-class-2023",
        category: "luxury",
        priceDaily: 12000,
        priceWeekly: 72000,
        priceMonthly: 260000,
        images: [
            "https://placehold.co/800x600/212121/white?text=Mercedes-Benz+C-Class+2023",
            "https://placehold.co/800x600/212121/white?text=Mercedes+C-Class+Interior",
            "https://placehold.co/800x600/212121/white?text=Mercedes+C-Class+Exterior",
            "https://placehold.co/800x600/212121/white?text=Mercedes+C-Class+Front"
        ],
        specs: {
            make: "Mercedes-Benz",
            model: "C-Class",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 5,
            luggage: 2,
            ac: "Yes",
            engine: "2.0L Turbo",
            mileage: "8-10 km/l"
        },
        features: ["MBUX Infotainment", "Burmester Sound", "Leather Interior", "Ambient Lighting", "Driver Assistance", "Panoramic Sunroof"],
        description: "The Mercedes-Benz C-Class represents the pinnacle of automotive luxury. With its premium interior, advanced technology, and refined performance, it's the ultimate choice for VIP transportation.",
        available: true,
        featured: true
    },
    {
        id: 12,
        name: "Nissan Almera 2023",
        slug: "nissan-almera-2023",
        category: "sedan",
        priceDaily: 2700,
        priceWeekly: 16200,
        priceMonthly: 58000,
        images: [
            "https://placehold.co/800x600/fbc02d/white?text=Nissan+Almera+2023",
            "https://placehold.co/800x600/fbc02d/white?text=Nissan+Almera+Interior",
            "https://placehold.co/800x600/fbc02d/white?text=Nissan+Almera+Exterior",
            "https://placehold.co/800x600/fbc02d/white?text=Nissan+Almera+Side"
        ],
        specs: {
            make: "Nissan",
            model: "Almera",
            year: 2023,
            fuelType: "Petrol",
            transmission: "Automatic",
            seats: 5,
            luggage: 3,
            ac: "Yes",
            engine: "1.0L",
            mileage: "16-18 km/l"
        },
        features: ["Bluetooth", "Touchscreen", "Reverse Camera", "Keyless Entry"],
        description: "The Nissan Almera is an affordable sedan that doesn't compromise on features. With excellent fuel economy and Nissan's reliability, it's a smart choice for budget-conscious renters.",
        available: true,
        featured: false
    }
];

// Export for use in other scripts (if using ES6 modules)
// Currently using global scope
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { carsData };
}

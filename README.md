# Rent a Car Bangladesh - SSL Rent a Car BD

A complete, responsive car rental website built with HTML, CSS (Bootstrap 5), and vanilla JavaScript. Designed specifically for the Bangladeshi market with BDT pricing, local cities, and regional car models.

## 📋 Project Overview

SSL Rent a Car BD is a car rental platform that allows customers to browse available vehicles, view detailed specifications, and make reservations online. The website is fully front-end based with mock data, making it perfect for demonstration, portfolio, or as a foundation for a full-stack implementation.

**Key Features:**
- Fully responsive design (desktop, tablet, mobile)
- Interactive car catalog with filtering & search
- Dynamic booking system with price calculation
- Car details page with image gallery
- Contact form with validation
- Bangladesh-specific content & pricing (BDT)
- Clean, maintainable codebase

---

## 🗂️ Project Structure

```
rent-a-car-bangladesh/
├── index.html              # Homepage with hero search
├── fleet.html              # Car listings with filters
├── car-details.html        # Individual car view
├── booking.html            # Reservation form
├── about.html              # Company info page
├── contact.html            # Contact form + map
├── terms.html              # Terms of Service
├── privacy.html            # Privacy Policy
│
├── css/
│   └── main.css            # Custom styles (700+ lines)
│
├── js/
│   ├── main.js             # Common utilities
│   ├── cars-data.js        # Car inventory (12 vehicles)
│   ├── homepage.js         # Homepage functionality
│   ├── fleet.js            # Fleet filtering & search
│   ├── car-details.js      # Gallery & booking prep
│   ├── booking.js          # Form validation & pricing
│   └── contact.js          # Contact form handling
│
├── images/
│   └── cars/               # Place car images here
│   ├── hero-bg.jpg         # Hero background
│   └── logo.png            # Brand logo
│
├── assets/
│   └── fonts/              # Custom fonts (if needed)
│
└── README.md               # This file
```

---

## 🚀 Getting Started

### Quick Start

1. **Clone or download** this repository to your local machine.
2. **Open** `index.html` in any modern web browser.
3. **Optional**: Serve with a local server for best experience.

### Local Server (Recommended)

Using Python 3:
```bash
cd rent-a-car-bangladesh
python -m http.server 8000
```

Using Node.js (http-server):
```bash
npm install -g http-server
http-server -p 8000
```

Then open: `http://localhost:8000`

---

## 🎨 Design & Branding

### Color Scheme

- Primary: `#1e88e5` (Trustworthy Blue)
- Secondary: `#ff6f00` (Action Orange)
- Accent: `#00acc1` (Teal)
- Dark: `#0d47a1` (Deep Blue)
- Light: `#e3f2fd` (Soft Blue)

### Typography

- **Headings:** Poppins (Google Fonts)
- **Body:** Roboto (Google Fonts)

### Responsive Breakpoints (Bootstrap)

- Mobile: <576px
- Tablet: ≥576px
- Desktop: ≥992px
- Large Desktop: ≥1200px

---

## 🚗 Car Inventory

The website includes **12 mock vehicles** with realistic Bangladeshi specifications:

| # | Car Model | Category | Daily Rate (৳) |
|---|-----------|----------|----------------|
| 1 | Toyota Corolla 2023 | Sedan | 3,500 |
| 2 | Honda Civic 2023 | Sedan | 3,800 |
| 3 | Mitsubishi Pajero 2022 | SUV | 6,500 |
| 4 | Nissan X-Trail 2023 | SUV | 5,500 |
| 5 | Toyota Prius 2022 | Hatchback | 2,800 |
| 6 | BMW 3 Series 2023 | Luxury | 12,000 |
| 7 | Hyundai Creta 2023 | SUV | 4,200 |
| 8 | Toyota Fortuner 2022 | SUV | 7,000 |
| 9 | Suzuki Swift 2023 | Hatchback | 2,200 |
| 10 | Mitsubishi Attrage 2022 | Sedan | 2,500 |
| 11 | Mercedes-Benz C-Class 2023 | Luxury | 12,000 |
| 12 | Nissan Almera 2023 | Sedan | 2,700 |

> Data location: `js/cars-data.js`

---

## ⚙️ JavaScript Modules

### main.js
Core utilities used across the site:
- Scroll-to-top button
- Date picker initialization
- Form validation helpers
- Price formatting (BDT)
- LocalStorage helpers
- Toast notifications

### cars-data.js
Mock vehicle database exported as `carsData` array.

### homepage.js
- Loads featured cars (3 randomly selected)
- Hero search form validation
- Animated card entrance

### fleet.js
- Multi-filter logic (category, price, search)
- Dynamic results count
- Reset filters functionality
- Car card rendering

### car-details.js
- URL parameter parsing to load specific car
- Image gallery with thumbnail navigation
- Keyboard navigation (← →)
- Populates booking form

### booking.js
- Car selection dropdown
- Date picker synchronization
- Dynamic price calculation with discounts:
  - Daily rate: standard
  - Weekly (7+ days): 10% discount
  - Monthly (30+ days): 20% discount
- Form validation
- Booking reference generation (RCBD-ABC-1234)
- Confirmation modal

### contact.js
- Contact form validation
- Submission to localStorage

---

## 🎯 Key Features

### 1. Responsive Navigation
- Sticky navbar with smooth scroll
- Mobile hamburger menu (Bootstrap)
- Active link highlighting

### 2. Hero Section with Search
- Background image with overlay
- Booking form with real-time validation
- Pickup/drop-off date logic

### 3. Filterable Fleet Page
- Filter by category (Sedan, SUV, Hatchback, Luxury)
- Filter by price range
- Text search across make, model, name
- Instant results update
- Results counter

### 4. Car Details Page
- Image gallery with thumbnails
- Full specifications table
- Feature list
- Quick booking CTA
- Sticky price summary

### 5. Booking System
- Vehicle selection
- Date selection with validation
- Location picker
- Customer information form
- Real-time price calculation
- Discount indicators
- Booking confirmation modal
- Stores in localStorage

### 6. Contact Page
- Contact details & office locations
- Interactive Google Maps iframe
- Contact form with validation
- Branch office cards

### 7. Legal Pages
- Terms of Service (comprehensive rental terms)
- Privacy Policy (GDPR-style)

---

## 💾 Data Storage (Frontend Only)

Bookings and inquiries are stored in browser localStorage:

```javascript
// Access bookings
localStorage.getItem('rentcarbd_bookings')
// Returns: [{"id":"RCBD-ABC-1234", "car":{...}, "customer":{...}, ...}]

// Access inquiries
localStorage.getItem('rentcarbd_inquiries')
```

**Note:** This is a static demo. For production, connect to a backend (Node.js, PHP, Firebase, etc.).

---

## 🎨 Customization Guide

### Change Brand Colors

Edit `css/main.css` root variables:

```css
:root {
    --brand-primary: #1e88e5;
    --brand-secondary: #ff6f00;
    --brand-accent: #00acc1;
    /* ... */
}
```

### Update Car Inventory

Edit `js/cars-data.js`. Add or modify car objects. Ensure each has:
- Unique `id`
- All required fields (name, category, priceDaily, specs, images, etc.)
- Image URLs (relative or absolute)

### Add New Pages

1. Create `page-name.html`
2. Use existing pages as templates
3. Link Bootstrap CSS/JS and `css/main.css`
4. Include required scripts (`main.js` + page-specific)
5. Add link to navigation in all pages

### Replace Images

Place images in `images/` folder or use URLs. Recommended:
- Hero background: `images/hero-bg.jpg` (1920×1080px)
- Car thumbnails: 800×600px
- Car detail images: 1200×800px

---

## 🧪 Testing Checklist

- [ ] All pages load without console errors
- [ ] Forms validate inputs correctly
- [ ] Price calculation works on booking page
- [ ] Filters work on fleet page
- [ ] Mobile menu toggles properly
- [ ] Images display correctly
- [ ] Scroll-to-top appears and works
- [ ] Carousel (if any) auto-plays
- [ ] Contact form submits successfully
- [ ] Booking confirmation modal appears

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## 🔧 Future Enhancements (Not Implemented)

- **Admin Dashboard** - Manage cars, bookings, users
- **Backend Integration** - Node.js/Express or PHP
- **Database** - MySQL, PostgreSQL, or Firebase
- **User Authentication** - Login/Register
- **Payment Gateway** - bKash, Nagad, Stripe, SSLCommerz
- **Email Notifications** - SMTP integration
- **Multilingual** - Bangla/English toggle
- **PWA** - Offline mode, installable
- **Car Availability Calendar** - Real-time availability
- **Review/Rating System** - Customer feedback
- **Blog/Resources** - Travel tips, guides
- **Advanced Search** - Location, date, features
- **GPS Tracking** - Real-time vehicle location

---

## 📦 Dependencies

External libraries (loaded via CDN):
- **Bootstrap 5.3.0** - CSS framework & components
- **Bootstrap Icons 1.10.0** - Icon library
- **Google Fonts** - Poppins & Roboto

No npm install required - all libraries are CDN-hosted.

---

## 🤝 Contributing

This is a standalone educational project. Feel free to fork, modify, and enhance as needed. If you find bugs or have improvements, submit a PR or open an issue.

---

## 📄 License

Free to use for personal and commercial projects. No attribution required, but appreciated.

---

## 📞 Contact

Developed for SSL Rent a Car BD, Bangladesh.

For questions about this codebase, reach out through the contact form on the website or email: **developer@example.com**

---

**Happy coding! 🚗💨**

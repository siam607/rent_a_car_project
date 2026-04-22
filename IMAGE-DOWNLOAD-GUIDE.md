# Car Images Download Guide
## SSL Rent a Car BD - Real Car Photos

Since automated downloads are limited, here are **direct image sources** for each car:

---

## 📸 How to Download Images Manually

### Method 1: Using Browser (Easiest)
1. Click on any image link below
2. Right-click on the image and select "Save image as..."
3. Save to the corresponding folder in `images/cars/[car-name]/`
4. Rename to `main.jpg` (or other appropriate name)

### Method 2: Bulk Download Script (Advanced)
Use the provided `download-images.ps1` script in PowerShell.

---

## 🚗 Direct Image Links by Car

### 1. Toyota Corolla 2023 (Sedan)
**Folder:** `images/cars/toyota-corolla-2023/`

**Search:** `site:commons.wikimedia.org Toyota Corolla 2023`
- Wikimedia: https://commons.wikimedia.org/wiki/Category:Toyota_Corolla_E210
- Unsplash Search: https://unsplash.com/s/photos/toyota-corolla-2023-sedan/

**Recommended:** Search "toyota corolla 2023 white" on:
- https://unsplash.com
- https://pexels.com
- https://pixabay.com

---

### 2. Honda Civic 2023 (Sedan)
**Folder:** `images/cars/honda-civic-2023/`

**Sources:**
- Honda Press: https://hondanews.com/en/honda/vehicles
- Unsplash: https://unsplash.com/s/photos/honda-civic-2023
- Search: "honda civic 2023 red sedan"

---

### 3. Mitsubishi Pajero 2022 (SUV)
**Folder:** `images/cars/mitsubishi-pajero-2022/`

**Sources:**
- Mitsubishi Global: https://www.mitsubishi-motors.com/en/innovation/technology/pajero/
- Unsplash: https://unsplash.com/s/photos/mitsubishi-pajero
- Pexels: https://www.pexels.com/search/mitsubishi%20pajero/
- Search: "mitsubishi pajero 2022 black offroad"

---

### 4. Nissan X-Trail 2023 (SUV)
**Folder:** `images/cars/nissan-x-trail-2023/`

**Sources:**
- Nissan Global: https://www.nissan-global.com/EN/
- Unsplash: https://unsplash.com/s/photos/nissan-x-trail
- Search: "nissan x-trail 2023 white SUV"

---

### 5. Toyota Prius 2022 (Hatchback)
**Folder:** `images/cars/toyota-prius-2022/`

**Sources:**
- Toyota Press: https://newsroom.toyota.co.jp/
- Unsplash: https://unsplash.com/s/photos/toyota-prius
- Search: "toyota prius 2022 silver hybrid"

---

### 6. BMW 3 Series 2023 (Luxury)
**Folder:** `images/cars/bmw-3-series-2023/`

**Sources:**
- BMW Press: https://www.press.bmwgroup.com/
- Unsplash: https://unsplash.com/s/photos/bmw-3-series-2023
- Search: "bmw 3 series 2023 black sedan"

---

### 7. Hyundai Creta 2023 (SUV)
**Folder:** `images/cars/hyundai-creta-2023/`

**Sources:**
- Hyundai News: https://www.hyundai.com/worldwide/en/media-center
- Unsplash: https://unsplash.com/s/photos/hyundai-creta
- Search: "hyundai creta 2023 blue SUV"

---

### 8. Toyota Fortuner 2022 (SUV)
**Folder:** `images/cars/toyota-fortuner-2022/`

**Sources:**
- Toyota Asia: https://www.toyota.astra-motor.co.id/
- Unsplash: https://unsplash.com/s/photos/toyota-fortuner
- Search: "toyota fortuner 2022 white 4x4"

---

### 9. Suzuki Swift 2023 (Hatchback)
**Folder:** `images/cars/suzuki-swift-2023/`

**Sources:**
- Suzuki Global: https://www.suzuki.com/
- Unsplash: https://unsplash.com/s/photos/suzuki-swift
- Search: "suzuki swift 2023 red hatchback"

---

### 10. Mitsubishi Attrage 2022 (Sedan)
**Folder:** `images/cars/mitsubishi-attrage-2022/`

**Sources:**
- Mitsubishi Motors: https://www.mitsubishi-motors.com/
- Search: "mitsubishi attrage 2022 silver sedan"

---

### 11. Mercedes-Benz C-Class 2023 (Luxury)
**Folder:** `images/cars/mercedes-c-class-2023/`

**Sources:**
- Mercedes-Benz Media: https://group.mercedes-benz.com/investors/
- Unsplash: https://unsplash.com/s/photos/mercedes-c-class
- Search: "mercedes c class 2023 black luxury"

---

### 12. Nissan Almera 2023 (Sedan)
**Folder:** `images/cars/nissan-almera-2023/`

**Sources:**
- Nissan News: https://nissannews.com/en-US/
- Search: "nissan almera 2023 white sedan"

---

## 📁 Required Images per Car

Each car folder should have **4 images**:

1. **main.jpg** - Front/exterior view
2. **interior.jpg** - Dashboard/interior
3. **exterior.jpg** - Side/back view
4. **side.jpg** or **front.jpg** or **offroad.jpg** - Additional angle

**Recommended specs:**
- Resolution: 800×600px minimum
- Format: JPG or WebP
- Size: <500KB per image (optimize)

---

## 🔍 Quick Search Terms

Copy-paste these into Google Images or Unsplash:

```
toyota corolla 2023 sedan white
honda civic 2023 red front view
mitsubishi pajero 2022 black 4x4 offroad
nissan x-trail 2023 white SUV front
toyota prius 2023 hybrid silver
bmw 3 series 2023 black luxury sedan
hyundai creta 2023 blue SUV
toyota fortuner 2022 white 7-seater
suzuki swift 2023 red hatchback
mitsubishi attrage 2022 silver sedan
mercedes c class 2023 black amg
nissan almera 2023 white sedan
```

**Add these keywords for better results:**
- `front view`
- `interior dashboard`
- `side view`
- `high quality`
- `official`

---

## ⚡ Quick One-Click Download (Windows PowerShell)

Run this in PowerShell inside your project folder:

```powershell
# Example for Toyota Corolla
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800" -OutFile "images/cars/toyota-corolla-2023/main.jpg"
```

**Note:** Unsplash image IDs change over time. Search Unsplash directly for latest images.

---

## ✅ After Downloading

1. Verify images load: `file:///E:/short%20project/Rent_a_Car/index.html`
2. Check browser console for 404 errors
3. Refresh fleet page to see all cars with images
4. Test car details page gallery

---

## 🌐 Alternative: Keep Using Placeholder Images

If you prefer not to download images, the website **already works** with `placehold.co` placeholders showing car names. To use placeholders permanently, keep the current `cars-data.js` as-is.

---

**Need help?** Search "free car stock photos" on:
- Unsplash.com
- Pexels.com
- Pixabay.com
- Wikimedia Commons (public domain)

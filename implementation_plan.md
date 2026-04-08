# Astrologer Website — Implementation Plan

## Overview

Build a **premium, clean astrologer website** using Vite + React with 5 pages. All content will be dummy/placeholder (easily swappable later). The design will feel premium and modern with muted, sophisticated colors.

**Astrologer Name (placeholder):** *Pandit Arjun Shastri*

---

## Design System

### Color Palette (muted, premium, cool)

| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep Muted Blue | `#3A5A8C` |
| Secondary | Sage Green | `#6B8F71` |
| Accent | Warm Amber | `#D4915E` |
| Background | Warm Off-White | `#F8F5F0` |
| Surface | White | `#FFFFFF` |
| Text Primary | Charcoal | `#2A2A2A` |
| Text Secondary | Muted Gray | `#6B6B6B` |
| Dark Section BG | Deep Navy | `#1E2A3A` |

### Typography
- **Headings:** `Playfair Display` (serif, elegant)
- **Body:** `Inter` (clean, modern sans-serif)

### Design Principles
- Generous whitespace
- Subtle shadows and borders
- Smooth hover transitions
- No harsh saturated colors
- Elegant section dividers

---

## Pages & Components

### 1. 🏠 Home Page
- **Hero Section** — Large heading, tagline, subtle celestial decorative element, CTA button
- **Services Overview** — 3-4 service cards (Kundli, Vastu, Gemstone Consultation, Marriage Matching)
- **Why Choose Section** — Trust factors / credentials
- **Testimonials** — 3 testimonial cards with dummy quotes
- **CTA Banner** — "Book a Consultation" with contact info

### 2. 👤 About Page
- **Hero Banner** — Page title with subtle background
- **Bio Section** — Photo placeholder + detailed bio text
- **Journey Timeline** — Key milestones in the astrologer's career
- **Credentials / Awards** — List of recognitions

### 3. 📝 Blog Page
- **Blog Listing** — Grid of blog cards with thumbnail, title, excerpt, date
- **6 dummy blog posts** (astrology topics)
- Cards link nowhere for now (placeholder)

### 4. 🛒 Shop (Stone Selling) Page
- **Page Header** — Title + description about authentic gemstones
- **Product Grid** — Product cards with:
  - Image placeholder (colored gemstone-style)
  - Stone name, price, brief description
  - **"Contact to Buy"** button (links to WhatsApp/phone)
- **8 dummy gemstone products** (Ruby, Emerald, Blue Sapphire, Yellow Sapphire, Pearl, Coral, Hessonite, Cat's Eye)
- **Trust Banner** — "100% Certified & Authentic" badges

### 5. 🏆 Hall of Fame Page
- **Photo Gallery** — Grid of placeholder images (events, awards, ceremonies)
- **Posters Section** — Larger format poster images
- **YouTube Videos** — 3-4 embedded YouTube video placeholders (using iframe embeds)
- **Masonry/grid style** layout

### Shared Components
- **Navbar** — Logo/name + nav links, mobile hamburger menu
- **Footer** — Contact info, social links, copyright, quick links

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Vite** | Build tool / dev server |
| **React 18** | UI framework |
| **React Router v6** | Client-side routing |
| **Vanilla CSS** | Styling (CSS custom properties for theming) |
| **Google Fonts** | Playfair Display + Inter |

---

## File Structure

```
astrologer-website/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css          ← Global styles, CSS variables, resets
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   └── pages/
│       ├── Home.jsx
│       ├── Home.css
│       ├── About.jsx
│       ├── About.css
│       ├── Blog.jsx
│       ├── Blog.css
│       ├── Shop.jsx
│       ├── Shop.css
│       ├── HallOfFame.jsx
│       └── HallOfFame.css
```

---

## Verification Plan

### Automated
- `npm run dev` — Confirm dev server starts without errors
- Browser test: Navigate all 5 pages, verify routing works, check responsive layout

### Manual
- Visual review of each page in the browser
- Mobile responsiveness check
- All "Contact to Buy" buttons functional

---

## Estimated Build Time
~30-40 minutes of execution. All dummy content included, ready for the user to swap in real content later.

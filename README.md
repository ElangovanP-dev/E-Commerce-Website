# 👑 AURALUXE | Premier Full-Stack E-Commerce Platform

A production-ready, ultra-responsive, Awwwards-caliber Full-Stack E-Commerce platform built with **Next.js 15**, **React 19**, **Prisma ORM**, **Tailwind CSS**, **Auth.js v5**, **Stripe API**, and **Zustand**.

---

## 🌟 Key Architecture & Features

### 1. 8-Theme Visual System
Instant zero-FOUC theme switching with persistent storage via cookies & local storage:
1. **Midnight Obsidian** (Default Luxury Dark)
2. **Nordic Frost** (Clean Modern Light)
3. **Emerald Botanical** (Organic Elegance)
4. **Sunset Terracotta** (Warm Artisanal)
5. **Cyber Neon** (Futuristic Pulse)
6. **Sandstone Japandi** (Minimal Warmth)
7. **Deep Ocean Abyss** (Marine Tech)
8. **Classic Editorial Monolith** (High-Contrast Print)

### 2. Storefront & PDP
- **Parallax Hero Carousel** & Announcement Bar with real-time countdown timer.
- **Faceted Filter Drawer**: Real-time fuzzy search, price range slider, star ratings, category checkboxes, size chips, color swatches, stock filter, sorting.
- **Product Detail Page (PDP)**: Magnifying zoom lens gallery, dynamic variant switcher, Imperial/Metric Size Guide modal, "Frequently Bought Together" bundle builder, verified reviews engine.

### 3. Cart & Multi-Step Checkout
- **Slide-out Cart Drawer**: Live free-shipping progress meter ($150 threshold), promo code applicator (`WELCOME20`, `SAVE50`, `VIPSUMMER`), optimistic quantity updates.
- **Multi-Step Checkout**: Shipping address validation, shipping method rate calculation, Stripe Elements payment simulator.
- **Post-Purchase**: Order confirmation with visual tracker (`Placed` -> `Packed` -> `Shipped` -> `Delivered`), printable PDF invoice, email notification.

### 4. Executive Admin CMS (`/admin`)
- **Analytics Dashboard**: Recharts interactive revenue/order trends, AOV, conversion rate metrics, low-stock warning cards.
- **Inventory Manager**: Product Data Table, Add/Edit modal, Variant Matrix Generator (Sizes x Colors), auto-generated SKUs.
- **Logistics**: Order status updater and tracking code assigner.
- **Promotions**: Coupon campaign creator with usage limits.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Database Migrations & Seed
```bash
npx prisma db push
npx prisma db seed
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Credentials for Testing

- **Admin Portal**: `admin@luxurystore.com` / `admin123` -> Navigate to `/admin`
- **Customer Account**: `customer@luxurystore.com` / `customer123` -> Navigate to `/account`
- **Promo Codes**: `WELCOME20` (20% Off), `SAVE50` ($50 Off), `VIPSUMMER` (30% Off)

---

## 🐳 Docker Deployment

To spin up PostgreSQL, Redis, and Next.js in containerized environment:

```bash
docker-compose up -d --build
```

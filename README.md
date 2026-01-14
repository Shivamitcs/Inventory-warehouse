# SHIVAM Inventory & Warehouse Management System

A premium, enterprise-grade Inventory & Warehouse Management web application built with Angular 17. Features a stunning modern UI with glassmorphism design, smooth animations, and comprehensive inventory tracking capabilities.

![Angular](https://img.shields.io/badge/Angular-17.0.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8)
![GSAP](https://img.shields.io/badge/GSAP-3.12.5-green)
![Lottie](https://img.shields.io/badge/Lottie-5.12.2-orange)

## 📸 Screenshots

<div align="center">

### Dashboard Overview
![Dashboard](images/1.png)

### Products & Stock Management
![Products](images/2.png)

### Suppliers & Vendors Dashboard
![Suppliers](images/3.png)

### Dark Mode Interface
![Dark Mode](images/4.png)

### Mobile Responsive View
![Mobile](images/5.png)

</div>

## 🚀 Tech Stack

### Core Framework
- **Angular 17** - Modern framework with standalone components
- **TypeScript 5.2** - Type-safe development
- **RxJS 7.8** - Reactive programming
- **Angular Router** - Client-side routing with lazy loading

### Styling & Design
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **CSS Variables** - Dynamic theming system
- **Custom Glassmorphism** - Premium frosted glass effects
- **Responsive Design** - Mobile-first approach
- **Google Fonts** - Poppins & Raleway font families

### Animations & Visual Effects
- **GSAP 3.12.5** - Professional animation library
  - Count-up number animations
  - SVG path drawing animations
  - Stagger animations for lists
  - Progress bar animations
  - Page intro animations
- **Lottie Web 5.12.2** - SVG-based animations
  - KPI icon animations
  - Loading states
  - Empty state animations
  - Interactive micro-animations
- **CSS Animations** - Scroll-triggered animations using Intersection Observer API
- **Angular Animations** - Route transitions and layout animations

### Development Tools
- **Angular CLI 17** - Development and build tools
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing

## 📦 Features

### Dashboard
- **Hero KPI Strip** - 4 key performance indicators with animated counters
- **Stock Health Radar** - 5 circular progress charts for inventory status
- **Inventory Flow Chart** - Inbound vs Outbound visualization with animated SVG paths
- **Warehouse Capacity Cards** - Real-time capacity tracking with animated progress bars
- **Smart Alerts Panel** - Critical alerts with priority color coding
- **Product Performance Heatmap** - Grid-based performance visualization
- **Purchase Orders Status** - Status tracking with stepper visualization
- **Inventory Calendar** - Stock arrival & dispatch calendar
- **Supplier Reliability Score** - Circular progress indicators
- **Top Moving Products** - Carousel with product cards
- **Warehouse Activity Timeline** - Vertical timeline with activity events
- **AI Insights** - Recommendation cards
- **Global Actions Panel** - Quick action buttons
- **Top Cities Bar Chart** - Geographic distribution visualization
- **Average Inventory Turnaround** - Multi-line chart for turnaround metrics

### Products & Stock Management
- **Product Listing** - Comprehensive product catalog with images
- **Search & Filter** - Real-time search and filtering capabilities
- **Stock Status Indicators** - Visual status badges (In Stock, Low Stock, Out of Stock)
- **Product Cards** - Beautiful card-based layout with hover effects
- **KPI Metrics** - Total products, in stock, low stock, and out of stock counts

### Suppliers & Vendors
- **Supplier Dashboard** - Comprehensive supplier management interface
- **Supplier Cards** - Detailed supplier information cards
- **Status Indicators** - Visual status dots (Preferred, Standard, At Risk, Blacklisted)
- **Reliability Metrics** - On-time delivery, fulfillment rates, and risk levels
- **Performance Charts** - Delivery trends, return rates, and dispute rates
- **Supplier Filtering** - Filter by status segments
- **KPI Overview** - Total suppliers, on-time delivery, fulfillment time, and risk metrics

### Alerts & Notifications
- Alert management interface
- Priority-based alert system
- Real-time notifications

### Settings
- Theme customization
- User preferences
- System configuration

### Layout & Navigation
- **Sticky Header** - Navigation with active route highlighting
- **Profile Dropdown** - User menu with profile and account settings
- **Theme Toggle** - Light/Dark mode switcher
- **Footer** - Company information and quick links
- **Scroll to Top** - Smooth scroll-to-top button
- **Responsive Navigation** - Mobile-friendly menu system

## 🎨 Design System

### Theme
- **Light Mode** - Clean, bright interface with subtle shadows
- **Dark Mode** - Modern dark theme with glassmorphic elements
- **Theme Persistence** - User preference saved in localStorage
- **System Preference Detection** - Automatic theme detection
- **Smooth Transitions** - Seamless theme switching

### Color Palette
- **Primary Colors** - Blue (#3B82F6) with gradients
- **Text Colors** - Dynamic text colors for light/dark themes
- **Background Colors** - Layered background system
- **Border Colors** - Subtle borders with theme awareness
- **Accent Colors** - Status-based color coding (green, blue, amber, red)

### Typography
- **Primary Font** - Poppins (weights: 300-900)
- **Secondary Font** - Raleway (weights: 300-900)
- **Font Smoothing** - Antialiased text rendering
- **Responsive Sizing** - Fluid typography scales

### Glassmorphism Effects
- **Glass Cards** - Frosted glass effect with backdrop blur
- **Glass Gradients** - Gradient overlays with glassmorphism
- **Soft Shadows** - Layered shadow system
- **Border Styling** - Subtle borders with transparency

### Spacing & Layout
- **Mobile-First** - Responsive grid system
- **Container System** - Max-width containers with padding
- **Gap System** - Consistent spacing using Tailwind utilities
- **Grid Layouts** - 12-column grid for desktop, 6-column for tablet

## 🎬 Animation Details

### GSAP Animations
- **Count-Up Animations** - Number counters with easing
- **SVG Path Drawing** - Animated line and area chart paths
- **Progress Bars** - Smooth width animations
- **Stagger Animations** - Sequential element animations
- **Page Intro** - Entrance animations for pages
- **Radial Progress** - Circular progress animations

### Lottie Animations
- **KPI Icons** - Animated icons for key metrics
- **Loading States** - Smooth loading animations
- **Empty States** - Engaging empty state illustrations
- **Micro-interactions** - Subtle hover and interaction animations

### CSS Scroll Animations
- **Intersection Observer** - Scroll-triggered animations
- **Fade In** - Opacity transitions
- **Slide Up** - Transform-based animations
- **Stagger Reveals** - Sequential reveal animations

### Angular Animations
- **Route Transitions** - Smooth page transitions
- **Fade Animations** - Component fade in/out
- **Slide Animations** - Vertical slide transitions

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── hooks/
│   │   │   ├── gsap.hook.ts          # GSAP animation utilities
│   │   │   └── lottie.hook.ts        # Lottie animation utility
│   │   ├── services/
│   │   │   └── theme.service.ts      # Theme management service
│   │   └── utils/
│   │       └── animations.ts         # Angular animation definitions
│   ├── layout/
│   │   ├── header/
│   │   │   └── header.component.ts   # Header with navigation
│   │   ├── footer/
│   │   │   └── footer.component.ts   # Footer component
│   │   └── sidebar/
│   │       └── sidebar.component.ts  # Sidebar navigation
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   └── dashboard.component.html
│   │   ├── products/
│   │   │   ├── products.component.ts
│   │   │   └── products.component.html
│   │   ├── suppliers/
│   │   │   ├── suppliers.component.ts
│   │   │   └── suppliers.component.html
│   │   ├── alerts/
│   │   │   ├── alerts.component.ts
│   │   │   └── alerts.component.html
│   │   └── settings/
│   │       ├── settings.component.ts
│   │       └── settings.component.html
│   ├── shared/
│   │   └── scroll-to-top/
│   │       └── scroll-to-top.component.ts
│   ├── app.component.ts              # Root component
│   └── app.routes.ts                 # Route configuration
├── styles.css                        # Global styles & theme
└── index.html                        # HTML entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher) or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd inventory-warehouse-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Development Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `npm test` - Run unit tests

## 🎯 Key Features Implementation

### Theme System
- Signal-based reactive theme management
- localStorage persistence
- System preference detection
- Smooth CSS transitions

### Animation System
- GSAP for data-driven animations
- Lottie for icon and loading animations
- CSS Intersection Observer for scroll animations
- Angular Animations for route transitions

### Routing
- Lazy-loaded routes for optimal performance
- Route-based code splitting
- Navigation state management
- Scroll-to-top on route change

### Responsive Design
- Mobile-first approach
- Breakpoint system (sm, md, lg, xl)
- Flexible grid layouts
- Touch-friendly interactions

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Static Hosting** - Deploy `dist/` folder to any static hosting service
- **Angular Universal** - Server-side rendering support (can be added)
- **Docker** - Containerized deployment (can be configured)
- **Cloud Platforms** - Deploy to Vercel, Netlify, AWS, Azure, etc.

### Environment Configuration
- Update API endpoints in service files
- Configure environment variables
- Set production build optimizations

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Customization

### Theme Colors
Edit `src/styles.css` to customize color variables:
```css
:root {
  --color-primary: 59 130 246;
  --color-background: 255 255 255;
  /* ... more colors */
}
```

### Animation Timing
Modify animation durations in component files or GSAP hooks.

### Fonts
Update font imports in `src/index.html` and font-family in `src/styles.css`.

## 📄 License

This project is private and proprietary.

## 👤 Author

**SHIVAM Inventory & Warehouse Management System**

- Website: [shivamitcs.in](https://shivamitcs.in)
- Email: contact@shivamitcs.in
- Phone: 9413833633
- Address: Lodha Complex, Nathdwara

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- GSAP for professional animation capabilities
- Lottie for beautiful SVG animations
- All open-source contributors

---

**Built with ❤️ using Angular 17, Tailwind CSS, GSAP, and Lottie**

# Vaulted Design Language
## "From Meme To Meaningful" - Solana Mobile Memecoin Platform

### 🎯 Design Philosophy
Vaulted employs **Android Material 3 expressive design** with **Solana branding**, featuring semi-transparent cards and sleek sliding animations. The platform is **dark mode only** and emphasizes a premium, tech-forward aesthetic that balances playful memecoin culture with serious DeFi functionality.

---

## 🎨 Color System

### Primary Palette (Solana Official Colors)
```css
--solana-green: #14F195     /* Primary accent, success states */
--solana-purple: #9945FF    /* Secondary accent, premium features */
--solana-dark: #0D1421      /* Background, dark surfaces */
--solana-light: #FFFFFF     /* Primary text, icons */
```

### Functional Colors
```css
--background-solid: #0D1421          /* Main background */
--foreground: #FFFFFF                /* Primary text */
--primary: #14F195                   /* CTA buttons, links, success */
--secondary: #9945FF                 /* Premium features, highlights */
--warning: #FFB800                   /* Alerts, mining status */
--destructive: #FF6B6B               /* Errors, danger states */
--success: #14F195                   /* Confirmations, positive states */
```

### Transparency System
```css
--card: rgba(20, 241, 149, 0.05)     /* Default card background */
--card-hover: rgba(20, 241, 149, 0.1) /* Card hover state */
--muted: rgba(255, 255, 255, 0.1)     /* Subtle backgrounds */
--muted-foreground: rgba(255, 255, 255, 0.6) /* Secondary text */
--border: rgba(20, 241, 149, 0.2)     /* Default borders */
--input-background: rgba(255, 255, 255, 0.05) /* Form inputs */
```

### Chart Colors (For Trading/Analytics)
```css
--chart-1: #14F195  /* Primary data (green) */
--chart-2: #9945FF  /* Secondary data (purple) */
--chart-3: #FFB800  /* Tertiary data (yellow) */
--chart-4: #FF6B6B  /* Quaternary data (red) */
--chart-5: #00D4FF  /* Additional data (cyan) */
```

---

## 📝 Typography

### Hierarchy & Weights
- **Base font size**: 14px
- **Font weights**: 400 (normal), 500 (medium)
- **Line height**: 1.5 (consistent across all elements)

### Element Sizing
```css
h1 { font-size: var(--text-2xl); font-weight: 500; }
h2 { font-size: var(--text-xl); font-weight: 500; }
h3 { font-size: var(--text-lg); font-weight: 500; }
h4 { font-size: var(--text-base); font-weight: 500; }
p, input { font-size: var(--text-base); font-weight: 400; }
button, label { font-size: var(--text-base); font-weight: 500; }
```

### Typography Rules
- **Headlines**: Medium weight (500) for all headings
- **Body text**: Normal weight (400) for readability
- **Interactive elements**: Medium weight (500) for emphasis
- **No custom font families**: Rely on system fonts for performance

---

## 🏗️ Component Architecture

### Material Card System
```css
.material-card {
  background: var(--card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--elevation-2);
  transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.material-card:hover {
  background: var(--card-hover);
  box-shadow: var(--elevation-3);
  transform: translateY(-2px);
}
```

### Elevation System (Material 3)
```css
--elevation-1: 0 1px 3px rgba(20, 241, 149, 0.12), 0 1px 2px rgba(20, 241, 149, 0.24);
--elevation-2: 0 3px 6px rgba(20, 241, 149, 0.16), 0 2px 4px rgba(20, 241, 149, 0.23);
--elevation-3: 0 10px 20px rgba(20, 241, 149, 0.19), 0 6px 6px rgba(20, 241, 149, 0.23);
--elevation-4: 0 14px 28px rgba(20, 241, 149, 0.25), 0 10px 10px rgba(20, 241, 149, 0.22);
--elevation-5: 0 19px 38px rgba(20, 241, 149, 0.30), 0 15px 12px rgba(20, 241, 149, 0.22);
```

---

## 🎬 Animation System

### Principles
- **NO external motion libraries** (no Framer Motion, CSS Motion, etc.)
- **CSS-only animations** using cubic-bezier timing
- **Smooth, purposeful transitions** that enhance UX
- **Material 3 timing**: `cubic-bezier(0.4, 0.0, 0.2, 1)`

### Core Animations
```css
/* Page Transitions */
.slide-in-up {
  animation: slideInUp 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.slide-in-right {
  animation: slideInRight 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.slide-in-left {
  animation: slideInLeft 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Interactive Effects */
.glow-effect {
  box-shadow: 0 0 20px rgba(20, 241, 149, 0.3);
}

.pulse-glow {
  animation: pulseGlow 2s infinite;
}
```

### Usage Guidelines
- **Page transitions**: Use `slide-in-up` for main content changes
- **Card hover**: Built into `.material-card` class
- **Status indicators**: Use `pulse-glow` for active states
- **Micro-interactions**: 0.3s transitions for buttons/hovers

---

## 🖼️ Background & Layout

### Background System
```jsx
{/* Multi-layer background with gradients */}
<div className="min-h-screen bg-background-solid">
  {/* Base gradient */}
  <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
  
  {/* Radial accents */}
  <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,241,149,0.1),transparent_50%)] pointer-events-none" />
  <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(153,69,255,0.1),transparent_50%)] pointer-events-none" />
  
  {/* Content */}
  <main className="relative z-10">
    <!-- App content here -->
  </main>
</div>
```

### Layout Principles
- **Mobile-first**: Design for mobile, enhance for desktop
- **Single-page app**: No page reloads, smooth transitions
- **Global header**: Persistent navigation with announcement banner
- **Floating elements**: Bottom-right for status indicators
- **Z-index layers**: Background (0), content (10), header (20), modals (40), toasts (50)

---

## 🧩 Component Patterns

### Page Structure Template
```jsx
export function ComponentName() {
  return (
    <div className="min-h-screen pt-20 lg:pt-28 pb-24 px-4">
      {/* Page header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1>Page Title</h1>
        <p className="text-muted-foreground">Description</p>
      </div>
      
      {/* Main content grid */}
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2">
        <div className="material-card p-6">
          <!-- Card content -->
        </div>
      </div>
    </div>
  )
}
```

### Button Patterns
```jsx
{/* Primary CTA */}
<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
  Launch Token
</Button>

{/* Secondary action */}
<Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
  Learn More
</Button>

{/* Danger action */}
<Button variant="destructive">
  Delete Token
</Button>
```

### Card Patterns
```jsx
{/* Standard content card */}
<div className="material-card p-6">
  <h3 className="mb-4">Card Title</h3>
  <p className="text-muted-foreground mb-4">Card description</p>
  <!-- Card content -->
</div>

{/* Status card with glow */}
<div className="material-card p-4 backdrop-blur-xl border border-primary/30 glow-effect">
  <div className="text-center">
    <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2 animate-pulse"></div>
    <p className="text-xs text-success font-medium">Status Text</p>
  </div>
</div>
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind defaults)
- **sm**: 640px and up
- **md**: 768px and up  
- **lg**: 1024px and up
- **xl**: 1280px and up

### Mobile-first Rules
```jsx
{/* Mobile spacing, desktop enhanced */}
<div className="pt-20 lg:pt-28 pb-24 px-4">

{/* Mobile single column, desktop grid */}
<div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">

{/* Mobile bottom fixed, desktop floating */}
<div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8">
```

---

## 🎮 Interactive States

### Status Indicators
```jsx
{/* Trading active */}
<div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>

{/* Mining active */}
<div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>

{/* Error state */}
<div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
```

### Hover Effects
- **Cards**: Lift 2px, increase glow, brighten background
- **Buttons**: Reduce opacity to 90%
- **Interactive elements**: 0.3s smooth transitions

---

## 🚫 Design Constraints

### What NOT to do:
- **❌ Light mode**: App is dark mode only
- **❌ External animation libraries**: No Framer Motion, CSS Motion, etc.
- **❌ Custom fonts**: Use system fonts for performance
- **❌ Bright colors**: Stick to the Solana palette
- **❌ Sharp corners**: Always use border-radius (1rem default)
- **❌ Solid cards**: Always use semi-transparent with backdrop blur
- **❌ Page reloads**: Single-page app with smooth transitions

### What TO do:
- **✅ Semi-transparent cards** with backdrop-filter blur
- **✅ Solana green/purple accents** on dark background
- **✅ CSS-only animations** with Material 3 timing
- **✅ Mobile-first responsive** design
- **✅ Consistent elevation** using predefined shadows
- **✅ Proper z-index layering** for components

---

## 🎯 Usage Guidelines for AI Assistants

When working on Vaulted components:

1. **Always start with the page template** structure
2. **Use `.material-card` class** for all card components
3. **Apply proper responsive classes** (mobile-first)
4. **Use only defined color variables** from the CSS
5. **Include appropriate animations** for page transitions
6. **Maintain proper spacing** with Tailwind utilities
7. **Follow the z-index system** for layering
8. **Test mobile and desktop layouts**

### Quick Reference Classes
```jsx
// Page container
className="min-h-screen pt-20 lg:pt-28 pb-24 px-4"

// Content wrapper  
className="max-w-6xl mx-auto"

// Standard card
className="material-card p-6"

// Page transition
className="slide-in-up"

// Grid layouts
className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3"
```

---

**Remember**: Vaulted is about bridging meme culture with serious DeFi functionality. The design should feel premium and trustworthy while maintaining approachability and fun. Every component should reflect the "From Meme To Meaningful" philosophy through thoughtful design choices.
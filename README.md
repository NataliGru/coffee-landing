# Bean Scene Coffee Landing Page

A responsive and accessible coffee shop landing page with an interactive
ordering flow, cart management, and UI feedback.

![Coffee Landing Page preview](./public/hero-bg.webp)

## Live demo

[View the deployed website](https://coffee-landing-natali-gru.vercel.app/)

## About the project

**Bean Scene** is a fictional coffee shop landing page focused on responsive
design, accessibility, and a complete client-side ordering experience.

Visitors can explore the menu, customize a drink by size and quantity, add it to
the cart, edit or remove cart items, and confirm the order. Product prices come
from a centralized TypeScript catalog, while the main menu content remains in
the HTML for SEO.

## Features

### Ordering and cart

- Product customization dialog with size and quantity controls
- Dynamic unit-price and order-total calculation
- Centralized product catalog and base prices
- Cart with automatic merging of identical drinks and sizes
- Quantity controls and item removal inside the cart
- Maximum of 10 drinks per product and size combination
- Dynamic cart counter and total-price calculation
- Empty-cart state with a link back to the menu
- Order confirmation flow that clears the cart
- Accessible toast notifications with actions and progress indicators

### Interface and accessibility

- Responsive desktop and mobile layouts
- Native, keyboard-accessible `<dialog>` elements
- Keyboard dismissal for dialogs and mobile navigation
- Accessible labels, live regions, and status announcements
- Visible keyboard focus states and reduced-motion support
- Scroll-triggered animations and a responsive feedback carousel

### Performance and SEO

- Semantic HTML content available without JavaScript
- SEO and social-sharing metadata
- Centralized dynamic prices without duplicated business data
- Optimized WebP images with explicit dimensions
- Lazy loading and asynchronous image decoding
- Reserved layout space for dynamic prices to avoid layout shifts

## Architecture

The TypeScript code is organized by responsibility:

```text
src/scripts/
├── cart-store.ts        # Cart state and business rules
├── cart-view.ts         # Cart rendering and UI updates
├── cart.ts              # Cart events and checkout flow
├── products.ts          # Product catalog and menu prices
├── order-calculations.ts # Order pricing and quantity rules
├── order-modal-view.ts  # Order dialog rendering
├── order-modal.ts       # Drink customization flow
├── modal-controls.ts    # Reusable dialog controls
├── toast.ts             # Toast notifications
├── slider.ts            # Feedback carousel
├── reveal.ts            # Scroll reveal animations
└── open-mobile-menu.ts  # Responsive navigation
```

The cart store is independent of the DOM. Rendering and interaction are kept in
separate modules, making the cart logic easier to maintain and test.

## Built with

- HTML5
- CSS3
- TypeScript
- Vite
- ESLint
- Prettier

## Getting started

To run the project locally:

```bash
git clone https://github.com/NataliGru/coffee-landing.git
cd coffee-landing
npm install
npm run dev
```

Then open the local URL shown in the terminal.

## Available scripts

```bash
npm run dev           # Start the development server
npm run build         # Type-check and create a production build
npm run preview       # Preview the production build
npm run lint          # Run ESLint
npm run format        # Format the project with Prettier
npm run format:check  # Check formatting without changing files
```

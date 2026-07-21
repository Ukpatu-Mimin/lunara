# Lunara

Lunara is a luxury gifting and surprise-planning web application. It provides a premium gift marketplace, curated gift box builder, romantic room decor packages, surprise experiences, customer/admin dashboards, vendor and inventory management, a memory vault, and several AI-assisted planning tools powered by either Google Gemini or OpenAI.

The project is built as a Vite, React, and TypeScript single-page application with a small Express server. The Express server serves the app during development and provides backend API routes that safely call the configured AI provider without exposing API keys in the browser.

## Features

- Luxury gift marketplace with filtering, searching, sorting, product detail modals, reviews, wishlist actions, cart actions, and instant checkout.
- Curated gift box builder with box size selection, theme selection, luxury item packing, live pricing, and optional AI-generated card messages.
- Experience and room decor booking flows for spa dates, candlelit dinners, boat cruises, romantic room setups, birthday decor, and proposal packages.
- Cart drawer with a multi-step checkout flow for item review, delivery scheduling, mock payment, and order creation.
- Admin-gated dashboard for orders, bookings, user registry, marketplace inventory, vendor directory, QR code portal, AI itinerary planning, CRM forecasts, saved recipients, occasions, and wishlist data.
- Memory vault for storing milestone memories and generating elegant AI narratives.
- Floating AI concierge chat widget named Amber.
- Browser-local persistence through `localStorage` for carts, orders, bookings, inventory, vendors, users, recipients, occasions, wishlist items, and memories.
- Graceful fallback responses for AI features when neither `GEMINI_API_KEY` nor `OPENAI_API_KEY` is configured.

## Tech Stack

- React 19
- TypeScript
- Vite
- Express
- Tailwind CSS v4
- Google Gemini via `@google/genai`
- OpenAI Responses API via server-side `fetch`
- Lucide React icons
- Motion for React animations
- dotenv for environment variables
- esbuild for bundling the production server

## Project Structure

```text
.
|-- index.html
|-- metadata.json
|-- package.json
|-- README.md
|-- server.ts
|-- tsconfig.json
|-- vite.config.ts
`-- src
    |-- App.tsx
    |-- data.ts
    |-- index.css
    |-- main.tsx
    |-- types.ts
    `-- components
        |-- AiGiftMatcher.tsx
        |-- CartModal.tsx
        |-- CurateBox.tsx
        |-- CustomerDashboard.tsx
        |-- DiscountMarquee.tsx
        |-- EventsSection.tsx
        |-- Experiences.tsx
        |-- GiftMarketplace.tsx
        |-- Hero.tsx
        |-- LandingPage.tsx
        |-- MemoryVault.tsx
        |-- Navbar.tsx
        |-- RoomDecor.tsx
        `-- VendorPortal.tsx
```

## Main Files

- `server.ts`: Express server, Vite middleware setup, production static serving, and AI API routes.
- `src/main.tsx`: React application entry point.
- `src/App.tsx`: Main application state, route/tab switching, authentication modal, cart integration, footer, and AI concierge widget.
- `src/data.ts`: Seed data for products, experiences, decor packages, testimonials, FAQs, and other static content.
- `src/types.ts`: Shared TypeScript interfaces for products, cart items, orders, bookings, recipients, vendors, memories, and other app models.
- `src/index.css`: Tailwind import, theme fonts, custom colors, global styles, and animation helpers.

## AI API Routes

The Express server exposes these API routes:

- `POST /api/gift-match`
  Generates personalized gift recommendations from recipient details.

- `POST /api/generate-card-message`
  Generates short calligraphy-style greeting card messages.

- `POST /api/narrate-memory`
  Converts a saved memory into elegant prose or poem-like narrative.

- `POST /api/concierge-chat`
  Powers the floating Amber AI concierge chat.

- `POST /api/generate-itinerary`
  Generates a step-by-step luxury surprise itinerary.

- `POST /api/crm-forecasts`
  Generates relationship CRM forecasts and proactive gifting suggestions.

The server supports both Gemini and OpenAI. If both keys are configured, OpenAI is used by default unless `AI_PROVIDER=gemini` is set. If neither key is configured, each route returns a built-in fallback response so the app remains usable locally.

## Requirements

Install these before running the project:

- Node.js 20 or newer recommended
- npm
- A Google Gemini API key or an OpenAI API key, optional but recommended for full AI functionality

## Clone And Run Locally

1. Clone the repository:

```bash
git clone https://github.com/Ukpatu-Mimin/lunara.git
cd lunara
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env.local
```

If the project does not include `.env.example`, create `.env.local` manually:

```bash
touch .env.local
```

4. Add at least one AI provider key to `.env.local`:

```bash
# Option A: Gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Option B: OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

If both keys are present, the server uses OpenAI by default. To force a provider, add one of these values:

```bash
AI_PROVIDER=gemini
# or
AI_PROVIDER=openai
```

You can also choose the OpenAI model:

```bash
OPENAI_MODEL=gpt-5.2
```

The API key is optional for local demos. Without a Gemini or OpenAI key, AI features use fallback data.

5. Start the development server:

```bash
npm run dev
```

6. Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the Express server with Vite middleware on port `3000`.

```bash
npm run build
```

Builds the frontend with Vite and bundles the server into `dist/server.cjs`.

```bash
npm run start
```

Runs the production server from `dist/server.cjs`. Run `npm run build` first.

```bash
npm run lint
```

Runs TypeScript checks with `tsc --noEmit`.

```bash
npm run clean
```

Removes generated build output.

## Production Build

To build and run the app in production mode:

```bash
npm run build
npm run start
```

The production server serves the built frontend from `dist` and keeps the same API routes available.

## Authentication Notes

Authentication is simulated for prototype/demo purposes.

- Client login accepts any email and password.
- Client sign-up stores a simulated user record in browser `localStorage`.
- Admin access uses a hardcoded demo passcode:

```text
admin
```

Admin mode unlocks the dashboard and memory vault. This is not production security and must be replaced with real authentication before launch.

## Data Persistence

The app currently uses browser `localStorage`, not a database. This means data is stored only in the current browser on the current device.

Common storage keys include:

- `lunara_cart`
- `lunara_orders`
- `lunara_bookings`
- `lunara_recipients`
- `lunara_occasions`
- `lunara_wishlist`
- `lunara_memories`
- `lunara_registered_users`
- `lunara_products`
- `lunara_vendors`
- `lunara_logged_in`
- `lunara_is_admin`

Clearing browser storage resets the app back to its seed/demo state.

## Current Limitations

This is a polished prototype, not a complete production commerce system.

- No real database.
- No real user authentication.
- No real payment processor.
- No server-side inventory persistence.
- No email, SMS, or delivery provider integration.
- Admin passcode is hardcoded.
- Uploaded inventory images are stored as base64 strings in browser storage.
- AI routes use Gemini or OpenAI when a matching key is configured, otherwise they return fallback content.
- Cart count in the navbar is currently visually fixed at `0`.

## Recommended Next Steps For Production

- Add a real database such as PostgreSQL or Supabase.
- Replace simulated login with secure authentication.
- Move orders, bookings, users, vendors, inventory, and memories to backend persistence.
- Add a payment provider such as Paystack, Flutterwave, or Stripe.
- Add server-side validation for all API inputs.
- Add role-based authorization for admin routes.
- Add automated tests for checkout, inventory, dashboard, and AI fallback behavior.
- Add file storage for uploaded product and memory images.
- Configure deployment environment variables securely.

## Environment Variables

```bash
# Gemini support
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI support
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-5.2

# Optional provider selector when both keys exist
AI_PROVIDER=gemini
# or
AI_PROVIDER=openai

# Production serving
NODE_ENV=production
```

`GEMINI_API_KEY` enables Gemini-backed AI routes. `OPENAI_API_KEY` enables OpenAI-backed AI routes through the Responses API. `OPENAI_MODEL` defaults to `gpt-5.2` when omitted. `AI_PROVIDER` is optional and only needed when you want to override the default provider selection. `NODE_ENV=production` makes the server serve the static Vite build from `dist`.

## License

No license file is currently included. Add a license before distributing or publishing the project publicly.

# EventHub

A modern event booking platform built with Next.js 16, React 19, and TypeScript. Users can browse events, create events, book tickets, and manage their bookings through an intuitive interface.

## Features

- **User Authentication** — Secure signup and login with email/password
- **Event Discovery** — Browse upcoming events with responsive grid layout
- **Event Management** — Create, update, and manage your own events
- **Ticket Booking** — Book tickets for events with quantity selection
- **Checkout Flow** — Seamless payment integration with confirmation pages
- **My Bookings Dashboard** — View all bookings organized by status (Confirmed, Pending, Cancelled)
- **Responsive Design** — Optimized for desktop and mobile devices

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router, Server Components, Server Actions) |
| **UI Library** | React 19 |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4, shadcn v4 (base-nova style) |
| **Forms** | @tanstack/react-form, Zod v4 |
| **Notifications** | sonner |
| **Icons** | lucide-react |
| **Auth Storage** | js-cookie (client-side) |

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20)
- npm, yarn, or pnpm
- Backend API running (see Environment Variables below)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd event-booking-system

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
BASE_API=http://localhost:8080/api/v1
NEXT_PUBLIC_BASE_API=http://localhost:8080/api/v1
```

Both variables point to the same backend API. `BASE_API` is used server-side, while `NEXT_PUBLIC_BASE_API` is used by client-side auth calls.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other Commands

```bash
npm run build    # Production build
npm run lint     # ESLint (flat config, core-web-vitals + typescript)
```

## Project Structure

```
src/
├── app/                    # App Router pages (Server Components)
│   ├── page.tsx            # Homepage with hero, features, upcoming events
│   ├── events/             # Event listing and detail pages
│   ├── create-event/       # Event creation form
│   ├── my-events/          # User's created events
│   ├── mybookings/         # User's bookings dashboard
│   ├── checkout/           # Booking confirmation
│   ├── success/            # Payment success page
│   ├── cancel/             # Payment failure page
│   ├── login/              # Login page
│   └── signup/             # Registration page
├── components/
│   ├── ui/                 # shadcn UI primitives (Button, Input, etc.)
│   ├── auth/               # Login and signup forms
│   ├── booking/            # Booking form and checkout UI
│   └── event/              # Event cards and forms
├── actions/                # Server Actions (thin wrappers)
├── service/                # API call layer
│   ├── auth/               # Client-side auth service
│   ├── bookings/           # Server-side booking service
│   └── event/              # Server-side event service
├── types/                  # Shared TypeScript types
├── utils/                  # Data formatting helpers
└── lib/                    # Utilities (cn helper for classnames)
```

## Architecture

The application follows a clear data flow pattern:

```
Client Components (forms, UI)
        ↓
Server Actions (src/actions/) — thin wrappers
        ↓
Service Layer (src/service/) — fetch calls
        ↓
External Backend API (BASE_API)
```

- **Server Components** — Pages that fetch data directly from the service layer
- **Client Components** — Interactive forms that call Server Actions
- **Auth** — Token stored in client-side cookie via js-cookie
- **Images** — Event photos served from Cloudinary

## API Endpoints

The app consumes the following backend endpoints:

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/register` | User registration | No |
| GET | `/events` | List all events | No |
| GET | `/events/:id` | Get event details | No |
| POST | `/events/create` | Create new event | Yes |
| GET | `/events/my-events` | Get user's events | Yes |
| PATCH | `/events/:id` | Update event | Yes |
| GET | `/bookings` | Get user's bookings | Yes |
| POST | `/bookings` | Create booking | Yes |
| GET | `/bookings/:id` | Get booking details | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

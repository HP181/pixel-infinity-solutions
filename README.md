<div align="center">

# Pixel Infinity Solutions

### Full-Stack Portfolio & Appointment Booking Platform

**Next.js 16** · **React 19** · **GraphQL** · **MongoDB Atlas** · **Tailwind CSS**

---

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [GraphQL API](#-graphql-api) · [Project Structure](#-project-structure) · [Performance](#-performance-optimizations) · [Getting Started](#-getting-started) · [Pages](#-pages)

</div>

---

## Overview

Pixel Infinity Solutions is a production-grade web platform for a Toronto-based digital agency. Clients can explore the portfolio, book appointments, and send messages — while admins manage everything through a real-time protected dashboard with automated email notifications.

Built from the ground up with a **single GraphQL endpoint** replacing all REST calls, **Apollo Client caching** for instant UI, and React 19 + Next.js 16 for peak performance.

---

## Features

| | Feature | Description |
|---|---|---|
| Home | **Landing Page** | Typewriter hero, expertise cards, 21-skill grid, agency workflow, embedded contact form |
| Portfolio | **Project Showcase** | 4 client projects (Ecommerce, Gym, Restaurant, Pixel-Infinity-Solutions) with Flowbite image gallery modals |
| About | **Agency Info** | Services overview — Website Dev, Software Dev, E-Commerce Dev, Web Design |
| Booking | **Appointment System** | 5-field DatePicker form submitted via GraphQL mutation |
| Contact | **Lead Capture** | 3-field form saved to MongoDB via GraphQL — also embedded in home page |
| Admin | **Dashboard** | Protected table — sort, filter, paginate, toggle columns, update appointment status |
| Email | **Auto Notifications** | Confirm/reject triggers branded HTML email to the client via Gmail SMTP |
| Auth | **Kinde Auth** | Server-side `isAuthenticated()` check renders admin vs public navbar; full login/logout flow |
| UX | **Dark Mode** | System-aware theme with manual toggle, persisted to `localStorage` |
| Data | **GraphQL + Apollo** | Single endpoint, `InMemoryCache`, `cache-and-network` background refresh |
| Nav | **Responsive Navbar** | Separate logged-in/logged-out navbars with `@headlessui/react` animated mobile drawer |

---

## Tech Stack

### Core

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.12 |
| UI Library | React | 19.2.8 |
| Language | JavaScript (ES Modules) | — |
| Styling | Tailwind CSS | 3.x |
| Database | MongoDB Atlas (Mongoose) | 8.x |
| Authentication | Kinde Auth | 2.13.0 |

### GraphQL

| Role | Package | Version |
|---|---|---|
| Schema Builder | graphql-yoga (`createSchema`) | 5.x |
| Runtime Executor | graphql | 16.x |
| Client | Apollo Client | 4.x |
| Reactive Layer | rxjs (Apollo peer dep) | 7.x |

### UI & Components

| Package | Purpose |
|---|---|
| Radix UI | Accessible headless primitives (checkbox, dropdown, popover) |
| shadcn/ui | Pre-styled layer over Radix (button, table, checkbox, input, dropdown, popover) |
| TanStack React Table v8 | Headless table engine (sort, filter, paginate, column visibility) |
| Flowbite React | Modal component for portfolio image gallery |
| react-datepicker | Date selection in booking form and admin table rows |
| react-hot-toast | Toast notifications via top-right `Toaster` |
| react-icons | Icon library (`CgMenu`, `CgClose`, `BsSun`, `BsMoon`) |
| react-simple-typewriter | Animated typewriter effect in hero Banner |
| @headlessui/react | `Transition` for animated mobile menu drawer |
| next-themes | `ThemeProvider` for dark / light mode |
| Nodemailer | Gmail SMTP — sends branded HTML appointment emails |
| clsx + tailwind-merge | `cn()` utility for conditional class merging (`lib/utils.js`) |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                  Browser                     │
│                                             │
│  React 19  ──►  Apollo Client               │
│                  (InMemoryCache)            │
└────────────────────┬────────────────────────┘
                     │ HTTP POST /api/graphql
                     ▼
┌─────────────────────────────────────────────┐
│           Next.js 16 App Router             │
│                                             │
│  graphql pkg  ◄──  typeDefs + resolvers     │
│  (buffered JSON — no streaming)             │
│       │                                     │
│       ├── Query:    appointments            │
│       ├── Mutation: createAppointment       │
│       ├── Mutation: createContact           │
│       └── Mutation: updateAppointmentStatus │
│                                             │
│  runtime = "nodejs"  +  force-dynamic       │
└────────────────────┬────────────────────────┘
                     │ Mongoose ODM
                     ▼
┌─────────────────────────────────────────────┐
│             MongoDB Atlas                    │
│  global._mongoose promise cache             │
│  bufferCommands: false / timeout: 10s       │
│  Collections: appointments · contacts       │
└────────────────────┬────────────────────────┘
                     │ on updateAppointmentStatus
                     ▼
              Nodemailer (Gmail SMTP)
                     │
                     ▼
            Client Inbox (HTML confirm / reject email)
```

> **Single endpoint design** — `/api/graphql` handles every read and write.
> The route uses the `graphql` package directly and returns a fully-buffered `Response.json()` — this avoids the streaming adapter crash that graphql-yoga's `handleRequest` causes on Vercel serverless.
> The only other API route is `/api/auth/[kindeAuth]` for Kinde Auth OAuth callbacks.

---

## GraphQL API

**Endpoint:** `POST /api/graphql`
**Health check:** `GET /api/graphql` → `{ "status": "ok" }`
**CORS:** All origins (`*`) with `OPTIONS` preflight handler included.

### Schema

```graphql
type Appointment {
  _id: ID!
  id: Int!
  name: String!
  email: String!
  date: String!
  subject: String!
  desc: String!
  status: String!          # "pending" | "confirm" | "reject"
  isVerifiedByAdmin: Boolean!
}

type ActionResult {
  message: String
  status: Int
  error: String
}

type MutationResult {
  message: String!
  statusCode: Int!
  error: String
}

type Query {
  appointments: [Appointment!]!
}

type Mutation {
  createAppointment(name: String!, email: String!, date: String!, subject: String!, desc: String!): ActionResult!
  createContact(name: String!, email: String!, message: String!): ActionResult!
  updateAppointmentStatus(_id: ID!, email: String!, name: String!, status: String!, date: String!): MutationResult!
}
```

### Query — Fetch All Appointments

```graphql
query GetAppointments {
  appointments {
    _id
    id
    name
    email
    date
    subject
    desc
    status
    isVerifiedByAdmin
  }
}
```

### Mutations

```graphql
# Book a new appointment
mutation CreateAppointment($name: String!, $email: String!, $date: String!, $subject: String!, $desc: String!) {
  createAppointment(name: $name, email: $email, date: $date, subject: $subject, desc: $desc) {
    message
    status
    error
  }
}

# Submit contact form
mutation CreateContact($name: String!, $email: String!, $message: String!) {
  createContact(name: $name, email: $email, message: $message) {
    message
    status
    error
  }
}

# Admin — update status + trigger email
mutation UpdateAppointmentStatus($_id: ID!, $email: String!, $name: String!, $status: String!, $date: String!) {
  updateAppointmentStatus(_id: $_id, email: $email, name: $name, status: $status, date: $date) {
    message
    statusCode
    error
  }
}
```

---

## Project Structure

```
codify/
├── app/
│   ├── _components/
│   │   ├── ApolloProvider.js      # "use client" — wraps app with Apollo context
│   │   ├── Banner.js              # Typewriter hero (react-simple-typewriter) + hero image
│   │   ├── Footer.js              # 3-col footer: logo · Company links · Services
│   │   ├── Life.js                # "A Day at Pixel Infinity" — 6-step workflow checklist
│   │   ├── LoggedInNavbar.js      # Desktop + mobile nav with Kinde LogoutLink
│   │   ├── LoggedoutNavbar.js     # Desktop + mobile nav with Kinde LoginLink
│   │   ├── Notification.js        # react-hot-toast Toaster (top-right)
│   │   ├── sendEmail.js           # Nodemailer — Gmail SMTP branded HTML emails
│   │   ├── Skills.js              # 21-skill logo grid from lib/data.skillsData
│   │   ├── Technologies.js        # 3 expertise cards: Front-end, Back-end, E-commerce
│   │   └── ThemeSwitch.js         # Fixed bottom-right toggle, localStorage-persisted
│   │
│   ├── admin/dashboard/
│   │   ├── page.js                # Full TanStack table — useQuery + useMutation + useMemo + useCallback
│   │   └── loading.js             # Animated pulse skeleton loader
│   │
│   ├── api/
│   │   ├── auth/[kindeAuth]/route.js   # Kinde Auth OAuth handler
│   │   └── graphql/route.js            # GraphQL API (Node.js runtime, force-dynamic, CORS)
│   │
│   ├── about/page.js              # Agency description + 4 service cards
│   ├── book-appointment/page.js   # 5-field booking form (useMutation)
│   ├── contact/page.js            # 3-field contact form (useMutation) — also in home
│   ├── portfolio/page.js          # 4 projects + Flowbite Modal image gallery
│   ├── protected/page.js          # Server component: isAuthenticated() → correct navbar
│   ├── layout.js                  # Root layout: Inter font · ThemeProvider · ApolloClientProvider
│   └── page.js                    # Home: Banner + Technologies + Skills + Life + Contact
│
├── lib/
│   ├── graphql/
│   │   ├── typeDefs.js            # GraphQL schema (Appointment, ActionResult, MutationResult)
│   │   └── resolvers.js           # Query + mutations (DB reads, .lean(), sendEmail call)
│   ├── schema/
│   │   ├── AppointmentSchema.js   # Mongoose model: name, email, date, subject, desc, status, isVerifiedByAdmin
│   │   └── Contact.js             # Mongoose model: name, email, message
│   ├── apolloClient.js            # Apollo Client singleton (HttpLink → /api/graphql, InMemoryCache)
│   ├── Connection.js              # Serverless-safe Mongoose pool (global._mongoose promise cache)
│   ├── data.js                    # Portfolio project screenshot URLs + 21-item skillsData array
│   └── utils.js                   # cn() — clsx + tailwind-merge
│
├── components/ui/                 # shadcn/ui components
│   ├── button.jsx
│   ├── checkbox.jsx
│   ├── dropdown-menu.jsx
│   ├── input.jsx
│   ├── popover.jsx
│   └── table.jsx
│
├── next.config.mjs                # optimizePackageImports: Radix UI, react-icons, flowbite-react
├── tailwind.config.js             # darkMode: class · custom mobile/desktop at 1000px · shadcn CSS vars
└── .env.local                     # MongoDB, Kinde, Gmail SMTP secrets
```

---

## Performance Optimizations

### Client-Side

| What | How | Why |
|---|---|---|
| `useMemo` — columns | 9-column definition memoized on `[handleDateChange, handleStatus, mutating]` | Avoids recreating all column objects on every render |
| `useMemo` — tableData | Merges server rows with local `localDates` map | Recomputes only when Apollo data or datepicker changes |
| `useCallback` — handlers | `handleDateChange` and `handleStatus` with stable refs | Prevents child re-renders caused by new function references |
| Apollo `InMemoryCache` | Singleton client, normalized cache | Instant render from cache on page revisit |
| `cache-and-network` | Serves cache immediately, refetches in background | Zero loading flash on second visit |
| Smart skeleton guard | `if (loading && appointments.length === 0)` | No skeleton flash during background refreshes |
| DatePicker `strategy: fixed` | `popperProps={{ strategy: "fixed" }}` + `popperPlacement="bottom-start"` | Calendar escapes `overflow: hidden` table without reflow |
| `optimizePackageImports` | Configured in `next.config.mjs` | Tree-shakes Radix UI, react-icons, flowbite-react at build time |

### Server-Side

| What | How | Why |
|---|---|---|
| `.lean()` on queries | Mongoose returns plain JS objects | Skips hydration overhead — significantly faster reads |
| `.select()` projection | 8 specific fields fetched from Atlas | Reduces wire payload from MongoDB |
| Global connection cache | `global._mongoose` promise — reused across warm invocations | No redundant reconnects; `bufferCommands: false` prevents silent hangs |
| Buffered GraphQL response | Direct `graphql()` call → `Response.json()` | Avoids graphql-yoga streaming adapter crash on Vercel serverless |
| `force-dynamic` on routes | Admin dashboard + GraphQL API route | Ensures fresh data — never statically cached |
| `runtime = "nodejs"` | GraphQL API route | Allows Mongoose (Node.js-only) in the serverless function |
| Single GraphQL endpoint | All ops via `/api/graphql` | No per-feature route overhead, no over-fetching |
| `refetchQueries` scoped | Only fires after status mutations | No unnecessary re-fetches on unrelated renders |
| React 19 concurrent | Automatic batching + concurrent features | Smoother UI under load, fewer layout flushes |

---

## Getting Started

### Prerequisites

- **Node.js** 20.9+ (project runs on Node 26)
- **MongoDB Atlas** account
- **Gmail** account with [App Password](https://support.google.com/accounts/answer/185833) enabled
- **Kinde** account — [kinde.com](https://kinde.com)

### Installation

```bash
# 1. Clone
git clone <repo-url>
cd codify

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Environment setup
cp .env.local.example .env.local
# Edit .env.local with your values

# 4. Dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

> **Note:** `--legacy-peer-deps` is required because several packages (react-datepicker, Radix UI, @headlessui/react, next-themes) have not yet updated their peer dependency declarations for React 19.

---

## Environment Variables

```env
# ─── MongoDB ──────────────────────────────────────────────────────────────────
# Use direct replica hostnames if your ISP blocks DNS SRV (_mongodb._tcp.*)
connectionString=mongodb://username:password@host1:27017,host2:27017,host3:27017/dbname?ssl=true&replicaSet=yourReplicaSet&authSource=admin&retryWrites=true&w=majority

# ─── Kinde Authentication ─────────────────────────────────────────────────────
KINDE_CLIENT_ID=your_client_id
KINDE_CLIENT_SECRET=your_client_secret
KINDE_ISSUER_URL=https://your-app.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/admin/dashboard

# ─── Email (Gmail SMTP + App Password) ────────────────────────────────────────
sendEmailUser=your@gmail.com
sendEmailPass=xxxx xxxx xxxx xxxx
```

> **MongoDB SRV blocked?** If you get `querySrv ECONNREFUSED`, your ISP is filtering DNS SRV records.
> Resolve the hostnames manually and use the direct connection string:
> ```bash
> nslookup -type=SRV _mongodb._tcp.<your-cluster>.mongodb.net
> nslookup -type=TXT <your-cluster>.mongodb.net
> ```

---

## Pages

| Route | Page | Auth | Description |
|---|---|---|---|
| `/` | Home | Public | Banner · expertise cards · 21 skills · workflow · contact form |
| `/about` | About | Public | Agency info + 4 service categories |
| `/portfolio` | Portfolio | Public | 4 projects — click thumbnail to open full image gallery modal |
| `/book-appointment` | Book Appointment | Public | 5-field form with DatePicker → GraphQL createAppointment |
| `/contact` | Contact | Public | 3-field form → GraphQL createContact (also embedded in home) |
| `/admin/dashboard` | Dashboard | **Kinde Auth** | Full appointment management table |
| `/api/graphql` | GraphQL API | Server | POST operations · GET health check · OPTIONS CORS preflight |
| `/api/auth/[kindeAuth]` | Kinde Auth | Server | OAuth callback handler |

---

## Admin Dashboard

Authentication is handled server-side by `app/protected/page.js` — it calls `getKindeServerSession().isAuthenticated()` and renders either `LoggedInNavbar` (with Logout button) or `LoggedOutNavbar` (with Admin Login button). Logging in via Kinde redirects to `/admin/dashboard`.

**Capabilities:**

- Sortable, filterable, paginated appointments table (TanStack React Table v8)
- Email column instant client-side filter input
- Toggle individual column visibility via Filter dropdown
- Inline DatePicker per row — `strategy: "fixed"` overlay never clipped by table `overflow: hidden`
- Confirm or Reject via dropdown → fires `updateAppointmentStatus` GraphQL mutation + sends branded HTML email to client automatically
- Multi-row checkbox selection with select-all
- Animated pulse skeleton on initial cold load; inline `Loading...` row during background refresh
- `force-dynamic` export prevents stale static caching

---

## Portfolio Projects

| Project | Gallery Size |
|---|---|
| Ecommerce | 4 screenshots |
| Gym | 8 screenshots |
| Restaurant | 6 screenshots |
| Pixel-Infinity-Solutions | 12 screenshots |

---

## Skills (21)

React · Next.js · Node.js · Express · MongoDB · Mongoose · GraphQL · GraphQL-Yoga · Apollo · Kinde · Nodemailer · React-Hook-Form · RXJS · Zod · Material UI · Tailwind CSS · Jest · HTML5 · CSS3 · JavaScript · Git · Vercel

---

## Vercel Deployment — What Broke & How It Was Fixed

### The Problem: Empty 500 on Vercel, Fine Locally

The `/api/graphql` endpoint worked perfectly in `next dev` and `next start` but returned an empty **HTTP 500** on Vercel with no error body.

**Root cause — graphql-yoga's streaming response:**
The route originally exported graphql-yoga's `handleRequest` directly. Yoga builds its HTTP response using a *ponyfilled* `Response` whose body is a `ReadableStream` (from `@whatwg-node/fetch`). The local Next.js runtime tolerates streaming bodies, but **Vercel's serverless Lambda runtime cannot serialize them** — so the function crashed silently after the resolver completed and returned a bare 500 with no body.

**The tell-tale sign:** even a `{ __typename }` query — which never touches MongoDB — returned 500, while `OPTIONS` (a bodyless 204 preflight) succeeded. This proved the issue was not the database or resolvers — it was specifically the **response body serialization** that Vercel couldn't handle.


### The Fixes (Applied & on GitHub)

| File | What Changed | Why |
|---|---|---|
| `app/api/graphql/route.js` | Replaced yoga's `handleRequest` with direct `graphql()` call → `Response.json(result)` | Buffered JSON body — Vercel can serialize it without a stream adapter |
| `lib/Connection.js` | Replaced `readyState` check with `global._mongoose` promise cache | Race-safe across concurrent cold starts; `bufferCommands: false` prevents silent hangs |
| `.npmrc` | Added `legacy-peer-deps=true` | Resolves `@headlessui/react` vs React 19 peer dependency conflict at install time |

The route remains pinned to `runtime = "nodejs"` and `dynamic = "force-dynamic"` — both required for Mongoose to run in the serverless function.

---

## Upgrade History

| Version | Next.js | React | Notes |
|---|---|---|---|
| Initial | 14.1.0 | 18.x | Server Actions for all data ops |
| Optimized | 14.1.0 | 18.x | GraphQL endpoint, Apollo Client v4, useMemo/useCallback |
| **Current** | **16.2.12** | **19.2.8** | Next.js 16, React 19, ESLint 9, Kinde 2.13, global Mongoose promise cache, buffered GraphQL response |

---

<div align="center">

Built with Next.js 16 · React 19 · GraphQL · MongoDB Atlas · Tailwind CSS

Toronto, Ontario, Canada

*Demo purposes only — not a registered company website.*

</div>

<div align="center">

# Pixel Infinity Solutions

### Full-Stack Portfolio & Appointment Booking Platform

**Next.js 16** · **React 19** · **GraphQL** · **MongoDB Atlas** · **Tailwind CSS**

---

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [GraphQL API](#-graphql-api) · [Performance](#-performance-optimizations) · [Getting Started](#-getting-started) · [Pages](#-pages)

</div>

---

## Overview

Pixel Infinity Solutions is a production-grade web platform for a Toronto-based digital agency. Clients can explore the portfolio, book appointments, and send messages — while admins manage everything through a real-time protected dashboard with automated email notifications.

Built from the ground up with a **single GraphQL endpoint** replacing all REST calls, **Apollo Client caching** for instant UI, and React 19 + Next.js 16 for peak performance.

---

## Features

| | Feature | Description |
|---|---|---|
| Portfolio | **Showcase** | Projects, skills, and technology stack on display |
| Booking | **Appointment System** | Date-picking form with live submission via GraphQL mutation |
| Contact | **Lead Capture** | Contact form saved directly to MongoDB |
| Admin | **Dashboard** | Protected table — sort, filter, paginate, update appointment status |
| Email | **Auto Notifications** | Confirm/reject triggers instant email to the client via Gmail SMTP |
| Auth | **Kinde Auth** | Middleware-protected admin route, login/logout flow |
| UX | **Dark Mode** | System-aware theme with manual toggle |
| Data | **GraphQL + Apollo** | Single endpoint, client-side cache, background refresh |

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
| API Server | graphql-yoga | 5.x |
| Client | Apollo Client | 4.x |
| Query Language | graphql | 16.x |
| Reactive Layer | rxjs | 7.x |

### UI & Components

| Package | Purpose |
|---|---|
| Radix UI | Accessible headless components (checkbox, dropdown, popover) |
| shadcn/ui | Pre-styled component layer over Radix |
| TanStack React Table v8 | Headless table (sort, filter, paginate) |
| react-datepicker | Date selection in forms and admin table |
| react-hot-toast | Toast notifications |
| react-icons | Icon library |
| next-themes | Dark / light mode |
| Nodemailer | Gmail SMTP email sending |

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
│  graphql-yoga  ◄──  typeDefs + resolvers    │
│       │                                     │
│       ├── Query:    appointments            │
│       ├── Mutation: createAppointment       │
│       ├── Mutation: createContact           │
│       └── Mutation: updateAppointmentStatus │
└────────────────────┬────────────────────────┘
                     │ Mongoose ODM
                     ▼
┌─────────────────────────────────────────────┐
│             MongoDB Atlas                    │
│  Connection pool (readyState check)         │
│  Collections: appointments · contacts       │
└────────────────────┬────────────────────────┘
                     │ on updateAppointmentStatus
                     ▼
              Nodemailer (Gmail SMTP)
                     │
                     ▼
            Client Inbox (confirm / reject email)
```

> **Single endpoint design** — `/api/graphql` handles every read and write.
> The only other API route is `/api/auth/[kindeAuth]` for Kinde Auth callbacks.

---

## GraphQL API

**Endpoint:** `POST /api/graphql`
**Explorer:** open `/api/graphql` in your browser (graphql-yoga ships a built-in playground)

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
│   │   ├── ApolloProvider.js      # "use client" Apollo context wrapper
│   │   ├── Banner.js
│   │   ├── Footer.js
│   │   ├── LoggedInNavbar.js
│   │   ├── LoggedoutNavbar.js
│   │   ├── Notification.js
│   │   ├── sendEmail.js           # Nodemailer — Gmail SMTP
│   │   ├── Skills.js
│   │   ├── Technologies.js
│   │   └── ThemeSwitch.js
│   │
│   ├── admin/dashboard/
│   │   ├── page.js                # Appointment table (useQuery + useMutation)
│   │   └── loading.js             # Animated skeleton loader
│   │
│   ├── api/
│   │   ├── auth/[kindeAuth]/route.js   # Kinde Auth handler
│   │   └── graphql/route.js            # graphql-yoga endpoint
│   │
│   ├── book-appointment/page.js   # Booking form (useMutation)
│   ├── contact/page.js            # Contact form (useMutation)
│   ├── portfolio/page.js
│   ├── about/page.js
│   ├── protected/page.js          # Auth gate component
│   ├── layout.js                  # Root layout + ApolloProvider
│   └── page.js                    # Home page
│
├── lib/
│   ├── graphql/
│   │   ├── typeDefs.js            # GraphQL schema definitions
│   │   └── resolvers.js           # Query + mutation resolvers
│   ├── schema/
│   │   ├── AppointmentSchema.js   # Mongoose appointment model
│   │   └── Contact.js             # Mongoose contact model
│   ├── apolloClient.js            # Apollo Client singleton
│   ├── Connection.js              # Mongoose connection pool
│   ├── data.js                    # Static content
│   └── utils.js
│
├── components/ui/                 # shadcn/ui component library
├── middleware.js                  # Kinde Auth — protects /admin/dashboard
├── next.config.mjs                # optimizePackageImports enabled
├── tailwind.config.js
└── .env.local
```

---

## Performance Optimizations

### Client-Side

| What | How | Why |
|---|---|---|
| `useMemo` — columns | Column defs memoized with dependency array | Avoids recreating 9 column objects on every render |
| `useMemo` — tableData | Merges server rows + local date overrides | Recomputes only when Apollo data or datepicker changes |
| `useCallback` — handlers | `handleDateChange`, `handleStatus` stable refs | Prevents child re-renders caused by new function references |
| Apollo `InMemoryCache` | Singleton client, normalized cache | Instant render from cache on page revisit |
| `cache-and-network` | Serves cache immediately, refetches in background | Zero loading flash on second visit |
| Skeleton on true first load | `loading && appointments.length === 0` | No skeleton flash during background refreshes |
| DatePicker `strategy: fixed` | `popperProps={{ strategy: "fixed" }}` | Calendar escapes `overflow: hidden` table without reflow |
| `optimizePackageImports` | Configured in `next.config.mjs` | Tree-shakes Radix UI, react-icons on server at build time |

### Server-Side

| What | How | Why |
|---|---|---|
| `.lean()` on queries | Mongoose returns plain JS objects | Skips Mongoose document hydration — faster reads |
| `.select()` projection | Only requested fields fetched from Atlas | Reduces network payload from MongoDB |
| Connection pooling | `readyState` check before `mongoose.connect()` | Reuses existing connection, no redundant reconnects |
| Single GraphQL endpoint | All ops via `/api/graphql` | No per-feature route overhead, no over-fetching |
| `refetchQueries` scoped | Only fires after mutations that change data | No unnecessary re-fetches on unrelated renders |
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

| Route | Page | Auth |
|---|---|---|
| `/` | Home — banner, skills, technologies | Public |
| `/about` | About the agency | Public |
| `/portfolio` | Project showcase | Public |
| `/book-appointment` | Appointment booking form | Public |
| `/contact` | Contact / lead form | Public |
| `/admin/dashboard` | Appointment management dashboard | **Protected** |
| `/api/graphql` | GraphQL API (yoga playground available) | Server |
| `/api/auth/[kindeAuth]` | Kinde Auth callback handler | Server |

---

## Admin Dashboard

Protected by Kinde Auth middleware (`middleware.js` → matcher: `/admin/dashboard`).

**Capabilities:**
- Sortable, filterable, paginated appointments table
- Email column with instant client-side filter
- Toggle individual column visibility
- Inline DatePicker per row (fixed-position overlay, never clipped)
- Confirm or Reject — fires GraphQL mutation + sends email to client automatically
- Multi-row checkbox selection
- Background refetch after every mutation — table stays fresh without full reload

---

## Upgrade History

| Version | Next.js | React | Notes |
|---|---|---|---|
| Initial | 14.1.0 | 18.x | Server Actions for all data ops |
| Optimized | 14.1.0 | 18.x | GraphQL endpoint, Apollo Client, useMemo/useCallback |
| **Current** | **16.2.12** | **19.2.8** | Next.js 16, React 19, ESLint 9, Kinde 2.13 |

---

<div align="center">

Built with Next.js 16 · React 19 · GraphQL · MongoDB Atlas · Tailwind CSS

Toronto, Ontario, Canada

</div>

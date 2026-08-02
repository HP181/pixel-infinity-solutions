/**
 * Seed script — run with:
 *   node --env-file=.env.local scripts/seed.mjs
 *
 * Populates 22 appointments spread across Apr–Sep 2026
 * with varied statuses, subjects, and clients to make
 * the admin Analysis dashboard charts meaningful.
 */

import mongoose from "mongoose";

const connectionString = process.env.connectionString;
if (!connectionString) {
  console.error("❌  Missing `connectionString` in .env.local");
  process.exit(1);
}

// ── Schema (inline to keep script self-contained) ─────────────────────────────
const appointmentSchema = new mongoose.Schema(
  {
    name:              { type: String, required: true },
    email:             { type: String, required: true },
    date:              { type: Date,   required: true },
    subject:           { type: String, required: true },
    desc:              { type: String, required: true },
    status:            { type: String, required: true, default: "pending" },
    isVerifiedByAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

// ── Seed data ──────────────────────────────────────────────────────────────────
// Clients — your own emails + a few others with different domains so the
// "Email Domain" pie chart in Analysis is interesting.
//
// Day-of-week breakdown: Wed peaks (9), Thu (6), Sun (3), Tue (2), Fri+Sat (1 each)
// Monthly trend: Apr(3) → May(4) → Jun(5) → Jul(5) → Aug(3) → Sep(2)

const appointments = [
  // ── April 2026 ─────────────────────────────────────────────────
  {
    name: "Hitkumar Patel",
    email: "hit98987@gmail.com",
    date: "2026-04-05", // Sunday
    subject: "Web Development",
    desc: "Looking to discuss a full-stack project using Next.js and MongoDB. Want guidance on folder structure and API design.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Alice Johnson",
    email: "alice.j@outlook.com",
    date: "2026-04-12", // Sunday
    subject: "React Consultation",
    desc: "Need help structuring a large React application — specifically around context, state management, and performance.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Bob Smith",
    email: "bsmith@yahoo.com",
    date: "2026-04-22", // Wednesday
    subject: "Career Guidance",
    desc: "Would like advice on transitioning from QA into a full-stack developer role. What skills should I prioritise?",
    status: "reject",
    isVerifiedByAdmin: true,
  },

  // ── May 2026 ───────────────────────────────────────────────────
  {
    name: "Hitkumar Patel",
    email: "hitpatel18112000@gmail.com",
    date: "2026-05-03", // Sunday
    subject: "Code Review",
    desc: "Completed a personal SaaS project and need a thorough review before sharing publicly. Focus on security and scalability.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Carol White",
    email: "carol@proton.me",
    date: "2026-05-14", // Thursday
    subject: "Next.js Setup",
    desc: "Need assistance setting up a Next.js app with Kinde authentication, Mongoose, and Tailwind — exactly like the Codify stack.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "David Lee",
    email: "davidlee@outlook.com",
    date: "2026-05-20", // Wednesday
    subject: "API Integration",
    desc: "Integrating a third-party REST API for real-time currency conversion into a finance dashboard.",
    status: "reject",
    isVerifiedByAdmin: true,
  },
  {
    name: "Codebucks Tech",
    email: "codebucks.tech@gmail.com",
    date: "2026-05-28", // Thursday
    subject: "Project Planning",
    desc: "Planning the full architecture for a B2B SaaS product from scratch — multi-tenant, role-based access, billing.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },

  // ── June 2026 ──────────────────────────────────────────────────
  {
    name: "Hitkumar Patel",
    email: "hkp63546@gmail.com",
    date: "2026-06-04", // Thursday
    subject: "Web Development",
    desc: "Building a portfolio website with Framer Motion animations and a blog powered by MDX.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Alice Johnson",
    email: "alice.j@outlook.com",
    date: "2026-06-10", // Wednesday
    subject: "Bug Fixing",
    desc: "Persistent hydration errors in a Next.js 14 app — happens only in production. Needs root-cause investigation.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Bob Smith",
    email: "bsmith@yahoo.com",
    date: "2026-06-17", // Wednesday
    subject: "Career Guidance",
    desc: "Preparing for senior developer interviews — looking for a mock technical interview and feedback session.",
    status: "pending",
    isVerifiedByAdmin: false,
  },
  {
    name: "Carol White",
    email: "carol@proton.me",
    date: "2026-06-24", // Wednesday
    subject: "React Consultation",
    desc: "Building an admin dashboard with Recharts and complex filtering. Need help with performance and component design.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "David Lee",
    email: "davidlee@outlook.com",
    date: "2026-06-30", // Tuesday
    subject: "Database Design",
    desc: "Designing a MongoDB schema for a multi-tenant SaaS app — figuring out whether to use embedded docs or references.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },

  // ── July 2026 ──────────────────────────────────────────────────
  {
    name: "Hitkumar Patel",
    email: "hit98987@gmail.com",
    date: "2026-07-07", // Tuesday
    subject: "API Integration",
    desc: "Integrating Stripe payments and webhooks into a Next.js e-commerce store — subscriptions and one-time payments.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Codebucks Tech",
    email: "codebucks.tech@gmail.com",
    date: "2026-07-15", // Wednesday
    subject: "Web Development",
    desc: "Migrating a large Express.js monolith to Next.js App Router with incremental adoption strategy.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Alice Johnson",
    email: "alice.j@outlook.com",
    date: "2026-07-18", // Saturday
    subject: "Code Review",
    desc: "TypeScript codebase review before production launch — checking for type safety gaps and potential runtime errors.",
    status: "reject",
    isVerifiedByAdmin: true,
  },
  {
    name: "Bob Smith",
    email: "bsmith@yahoo.com",
    date: "2026-07-23", // Thursday
    subject: "Project Planning",
    desc: "Mapping out a mobile-first web app for a local business — budget constraints, feature prioritisation, stack selection.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "Carol White",
    email: "carol@proton.me",
    date: "2026-07-29", // Wednesday
    subject: "Next.js Setup",
    desc: "Setting up a headless CMS-powered site with Next.js and Sanity — preview mode, ISR, and image optimisation.",
    status: "pending",
    isVerifiedByAdmin: false,
  },

  // ── August 2026 (current month) ────────────────────────────────
  {
    name: "Hitkumar Patel",
    email: "hitpatel18112000@gmail.com",
    date: "2026-08-05", // Wednesday
    subject: "React Consultation",
    desc: "Upgrading from React 17 to React 19 — need help navigating breaking changes and adopting the new concurrent features.",
    status: "confirm",
    isVerifiedByAdmin: true,
  },
  {
    name: "David Lee",
    email: "davidlee@outlook.com",
    date: "2026-08-12", // Wednesday
    subject: "Bug Fixing",
    desc: "Memory leak in a long-running Node.js process — profiling shows heap growth but the source is unclear.",
    status: "pending",
    isVerifiedByAdmin: false,
  },
  {
    name: "Codebucks Tech",
    email: "codebucks.tech@gmail.com",
    date: "2026-08-20", // Thursday
    subject: "Web Development",
    desc: "Building a real-time analytics dashboard with WebSockets and live charts — architecture and backend design needed.",
    status: "pending",
    isVerifiedByAdmin: false,
  },

  // ── September 2026 (upcoming) ─────────────────────────────────
  {
    name: "Hitkumar Patel",
    email: "hkp63546@gmail.com",
    date: "2026-09-10", // Thursday
    subject: "Career Guidance",
    desc: "Discussing options for launching a freelance web development business — pricing, contracts, finding clients.",
    status: "pending",
    isVerifiedByAdmin: false,
  },
  {
    name: "Alice Johnson",
    email: "alice.j@outlook.com",
    date: "2026-09-18", // Friday
    subject: "API Integration",
    desc: "Integrating GraphQL on top of a legacy REST API — deciding between schema stitching vs a full migration.",
    status: "pending",
    isVerifiedByAdmin: false,
  },
];

// ── Run ───────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 10_000 });
  console.log("Connected.");

  const existing = await Appointment.countDocuments();
  if (existing > 0) {
    await Appointment.deleteMany({});
    console.log(`Cleared ${existing} existing appointment(s).`);
  }

  const docs = appointments.map((a) => ({ ...a, date: new Date(a.date) }));
  const inserted = await Appointment.insertMany(docs);

  console.log(`\n✅  Seeded ${inserted.length} appointments`);
  console.log(`   Confirmed : ${docs.filter(d => d.status === "confirm").length}`);
  console.log(`   Rejected  : ${docs.filter(d => d.status === "reject").length}`);
  console.log(`   Pending   : ${docs.filter(d => d.status === "pending").length}`);
  console.log(`   Months    : Apr → Sep 2026`);

  await mongoose.disconnect();
  console.log("\nDone. Open /admin/dashboard → Analysis tab to explore.\n");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});

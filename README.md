# Pagoole Ecommerce

Pagoole Ecommerce is a full-stack multi-vendor ecommerce platform built with Next.js, Prisma, PostgreSQL, and Auth.js. It includes a customer storefront, vendor-facing product and order workflows, authentication, checkout, wishlist management, and dashboard APIs in a single codebase.

## Short Description

A modern multi-vendor ecommerce application with customer shopping flows, vendor management, secure authentication, and a PostgreSQL-backed API built on Next.js.

## Highlights

- Multi-vendor storefront with category, vendor, and product browsing
- Customer cart, wishlist, checkout, and order tracking flows
- Vendor dashboard for products, vendors, orders, and profile-related operations
- Auth.js authentication with Google OAuth and credentials login
- Prisma ORM with PostgreSQL for application data
- OTP and password reset support through email delivery
- File upload handling for product and vendor-related assets
- App Router-based API routes and server-rendered pages

## Tech Stack

- Next.js 15
- React 19
- Auth.js / NextAuth v5
- Prisma ORM
- PostgreSQL
- Tailwind CSS 4
- Nodemailer
- bcryptjs

## Project Structure

```text
src/
  app/                App Router pages, layouts, API routes, and server actions
  components/         UI components for storefront, dashboard, auth, and checkout
  config/             Prisma and mail configuration
  context/            React context providers
  hooks/              Custom hooks
  lib/                Shared helpers and server-side actions
  services/           Client-facing service layer for internal API calls
  utils/              Utility functions
prisma/               Prisma schema and migrations
public/               Static assets
documents/            Project documents and references
Database_Initialization_Scripts_And_All_Objects/
                      SQL initialization and reference data scripts
```

## Core Features

### Customer Experience

- Browse featured, related, category-wise, and vendor-wise products
- View product details, pricing, stock, and images
- Add products to cart and wishlist
- Manage checkout, delivery address, and order placement
- View order history and order details

### Vendor and Admin Workflows

- Dashboard summary and order overview
- Vendor product creation, update, and listing flows
- Vendor management APIs
- Category and inventory-related dashboard operations

### Authentication

- Email/password login
- Google sign-in
- Session-based protected routes via middleware
- OTP/password reset flow backed by email

## Getting Started

### Prerequisites

Make sure you have the following installed and available locally:

- Node.js 18 or newer
- npm
- PostgreSQL

### Installation

```bash
git clone <repository-url>
cd pagoole-ecommerce
npm install
```

## Environment Variables

Create a `.env.local` file in the project root and configure the required values:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>?schema=discountshop"

NEXT_PUBLIC_API_URL="http://localhost:3000"
AUTH_URL="http://localhost:3000"
AUTH_SECRET="<strong-random-secret>"
JWT_SIGNING_SECRET="<jwt-signing-secret>"

GOOGLE_CLIENT_ID="<google-client-id>"
GOOGLE_CLIENT_SECRET="<google-client-secret>"

EMAIL="<smtp-email-address>"
EMAIL_PASSWORD="<smtp-app-password>"
```

### Notes

- `DATABASE_URL` must point to an existing PostgreSQL database.
- `AUTH_URL` should match the app URL used in your local or deployed environment.
- `AUTH_SECRET` and `JWT_SIGNING_SECRET` should be replaced with strong private values.
- Google OAuth credentials are required only if you want Google sign-in enabled.

## Database Setup

Apply the Prisma schema and migrations:

```bash
npx dotenv -e .env.local -- prisma migrate deploy
```

For local development, if the target database does not already exist, create it first in PostgreSQL and then run the migration command above.

Optional development commands:

```bash
npm run prisma:dev
npm run prisma:reset
```

## Run the Project

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

Open the app at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run prisma:dev
npm run prisma:reset
```

## Authentication and Access Control

- Auth.js is used for session management and provider integration.
- Middleware protects dashboard and private API routes.
- Credentials login depends on user records stored in PostgreSQL.

## Database and Seed Resources

The repository contains SQL reference materials under:

```text
Database_Initialization_Scripts_And_All_Objects/
```

These files can be used as reference data sources for initializing or extending the catalog, locations, and related entities.

## Deployment Notes

Before deploying:

- Provision a PostgreSQL database
- Set all required environment variables
- Run Prisma migrations against the target database
- Configure Google OAuth callback URLs if Google sign-in is enabled
- Configure SMTP credentials for OTP and password reset flows

## Current Status

As of July 21, 2026, the project builds successfully with:

```bash
npm run build
```

and runs against a properly provisioned PostgreSQL database.

## License

This repository does not currently declare a license. Add one before public distribution if needed.

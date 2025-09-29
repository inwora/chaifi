# Overview

Chai-Fi is a modern billing web application specifically designed for cafes, tea shops, and small restaurants. It provides a complete point-of-sale solution with a React frontend, Express.js backend, and flexible data storage supporting both MongoDB Atlas cloud database and in-memory fallback. The application features a splash page, secure admin authentication, dynamic menu management, payment processing (GPay/Cash), invoice generation with PDF export, and comprehensive analytics with daily, weekly, and monthly reports.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses React 18 with TypeScript in a single-page application (SPA) architecture. Wouter provides lightweight client-side routing, while TanStack Query handles server state management with caching and synchronization. The UI is built with Radix UI components and styled using Tailwind CSS following a design system with custom CSS variables. The application follows a page-based structure with components for splash, login, menu, payment, invoice, and dashboard views.

## Backend Architecture
The server implements a REST API using Express.js with TypeScript. Routes are organized by functionality (auth, menu, transactions, summaries) with proper error handling middleware. The application uses a storage abstraction layer that allows switching between MongoDB Atlas and in-memory storage based on environment configuration. Session management and authentication use simple username/password validation with localStorage tokens on the frontend.

## Build System and Development
Vite serves as the build tool with hot module replacement in development. The project uses ESBuild for server-side bundling and supports both development and production builds. TypeScript configuration enables strict type checking across client, server, and shared code. The monorepo structure with shared schema ensures type safety between frontend and backend.

## Data Storage Solutions
The application implements a dual-storage strategy using a common interface (IStorage). MongoDB Atlas serves as the primary production database with automatic failover to MemStorage (in-memory) if connection fails. The data model includes collections for users, menu items, transactions, and time-based summaries (daily, weekly, monthly). Drizzle ORM provides type-safe database operations with PostgreSQL schema definitions that can be adapted for MongoDB.

## Authentication and Authorization
Authentication uses fixed credentials (Username: "Chai-fi", Password: "Chai-fi@2025") stored in the database. The system generates simple tokens stored in localStorage for session persistence. All protected routes validate the presence of auth tokens, though the current implementation is basic and suitable for single-admin scenarios.

## External Dependencies
The application integrates jsPDF for client-side invoice and report generation. Vercel provides the deployment platform with specific configuration for serverless functions. The project uses shadcn/ui component library built on Radix UI primitives for accessible, customizable interface components. Development includes Replit-specific plugins for runtime error handling and debugging.

## Payment Processing
Payment handling supports both GPay and Cash methods with manual total adjustments. The system tracks payment methods in transaction records and generates summaries segmented by payment type. Invoice generation creates professional PDF documents with company branding and transaction details.

## Analytics and Reporting
The system automatically generates daily, weekly, and monthly summaries with GPay vs Cash breakdowns. All reports can be exported as PDF documents with professional formatting. The dashboard provides real-time analytics with downloadable reports for different time periods.

## Mobile Responsiveness & Production Readiness
The application is now fully mobile-responsive with a mobile-first design approach. It includes dedicated mobile navigation with hamburger menu, touch-friendly interfaces with proper button sizing (minimum 48px), and responsive layouts across all views. The application supports both portrait and landscape orientations on mobile devices.

## Production Deployment Configuration
The application includes comprehensive production deployment configuration with CORS headers for cross-origin requests, cache control headers to prevent stale data, and environment variable management for MongoDB Atlas integration. Production setup documentation provides step-by-step instructions for Vercel deployment with database configuration.

# Recent Changes

**Latest Update (September 29, 2025):**
- ✅ Fully mobile-responsive design across all application views
- ✅ Mobile navigation with hamburger menu for small screen devices  
- ✅ Touch-friendly interface with proper button sizing (48px minimum)
- ✅ CORS configuration for production deployment on Vercel
- ✅ Cache control headers to prevent stale data issues
- ✅ Production database configuration with MongoDB Atlas integration
- ✅ Comprehensive deployment documentation in PRODUCTION_SETUP.md
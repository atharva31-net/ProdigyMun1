# Prodigy MUN 2024 Registration Portal

## Overview

This is a comprehensive MUN (Model United Nations) registration portal designed for Prodigy students. The application features a modern React frontend with TypeScript and an Express.js backend, providing student registration functionality and an admin panel for managing registrations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: Currently uses in-memory storage (MemStorage class) as MVP solution, with Drizzle ORM configured for PostgreSQL migration
- **API Design**: RESTful API endpoints
- **Validation**: Zod schemas for input validation
- **Authentication**: Simple session-based authentication for admin panel

### Database Schema
The application uses Drizzle ORM with PostgreSQL schema definitions:
- **Users Table**: Stores admin credentials (username, password)
- **Registrations Table**: Stores student registration data including name, grade, division, committee selection, email, and status

## Key Components

### Student Registration System
- Grade-based eligibility (grades 8-12, divisions A-K)
- Committee selection with Indian committees prioritized over international committees
- One registration per student restriction
- Optional email field and suggestions box
- Real-time form validation and duplicate prevention

### Admin Panel
- Secure login with predefined credentials
- Dashboard with registration statistics
- Registration management (view, confirm, reject, delete)
- Search and filter functionality
- Confirmation dialogs for destructive actions

### UI Components
- Comprehensive shadcn/ui component library integration
- Responsive design optimized for mobile and desktop
- Toast notifications for user feedback
- Modal dialogs for admin actions

## Data Flow

1. **Student Registration**: Form submission → validation → duplicate check → storage → success confirmation
2. **Admin Authentication**: Login form → credential verification → session storage → dashboard access
3. **Registration Management**: Admin actions → confirmation dialogs → API calls → data updates → UI refresh

## External Dependencies

### Core Dependencies
- **Frontend**: React, TypeScript, Wouter, TanStack Query, React Hook Form, Zod
- **UI**: Tailwind CSS, shadcn/ui components, Radix UI primitives
- **Backend**: Express.js, Drizzle ORM, Neon Database serverless
- **Build Tools**: Vite, esbuild for production builds

### Development Tools
- **Development Server**: Vite with HMR support
- **TypeScript**: Strict type checking enabled
- **Replit Integration**: Runtime error overlay and cartographer plugins

## Deployment Strategy

The application is configured for separate frontend and backend deployments:

### Frontend Deployment (Netlify)
- Static site generation through Vite build process
- Optimized production bundles
- Environment-specific configuration

### Backend Deployment (Render)
- Node.js server deployment
- PostgreSQL database integration ready
- Environment variable configuration for production

### Database Migration Path
- Current: In-memory storage for MVP
- Future: PostgreSQL with Drizzle ORM
- Migration scripts ready via `npm run db:push`

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
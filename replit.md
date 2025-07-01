# Prodigy MUN 2025 Registration Portal

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
- **Database**: PostgreSQL with Drizzle ORM (migrated from in-memory storage)
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

The application is restructured for independent frontend and backend deployments:

### Project Structure
- **client/**: Complete frontend application with its own package.json and build process
- **server/**: Complete backend application with its own package.json and build process
- **shared/**: Common TypeScript types used by both frontend and backend

### Frontend Deployment (Netlify)
- React + Vite application in `client/` directory
- Independent build process: `npm install && npm run build`
- Static site generation with optimized bundles
- Automatic API proxy configuration to backend

### Backend Deployment (Render)
- Express.js + Node.js application in `server/` directory  
- Independent build process: `npm install && npm run build`
- PostgreSQL database integration
- Environment variable configuration for production

### Database Migration Path
- ✓ Completed: Migrated from in-memory storage to PostgreSQL with Drizzle ORM
- Database tables created with `npm run db:push`
- Admin user seeded in production database

## Recent Changes
- July 01, 2025: Updated to MUN 2025, added school building image as hero image, added Prodigy logo to navigation
- July 01, 2025: Combined committee selection into single list (Indian committees at top, international below)
- July 01, 2025: Created comprehensive deployment configuration with netlify.toml and render.yaml
- July 01, 2025: Added detailed deployment guide for GitHub/Netlify/Render deployment
- July 01, 2025: Updated admin credentials as specified (admin: prodigymun0, pass: munprodiy#123@12@12)
- July 01, 2025: Migrated from in-memory storage to PostgreSQL database with Drizzle ORM
- July 01, 2025: Restructured project for separate frontend/backend deployment with independent package.json files

## Changelog
- July 01, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
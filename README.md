# Prodigy MUN 2025 - Registration Portal

A comprehensive MUN registration website for Prodigy students with admin panel and deployment-ready architecture.

## Features

### Student Registration
- Registration form for delegates only (grades 8-12, divisions A-K)
- Committee selection with Indian committees prioritized, followed by international committees
- One committee selection per person restriction
- Optional email field and suggestions box
- Form validation and duplicate registration prevention

### Admin Panel
- Secure admin login with predefined credentials
- Dashboard with registration statistics
- Registration management (view, confirm, reject, delete)
- Search and filter functionality
- Confirmation dialogs for all actions

### Technical Features
- Modern React frontend with TypeScript
- Express.js backend with REST API
- In-memory storage for MVP (easily replaceable with database)
- Responsive design with Tailwind CSS and shadcn/ui components
- Production-ready deployment configuration

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- Tailwind CSS for styling
- shadcn/ui component library
- TanStack Query for state management
- React Hook Form with Zod validation

### Backend
- Express.js with TypeScript
- In-memory storage (MemStorage)
- RESTful API design
- Input validation with Zod
- CORS enabled

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   
# Prodigy MUN 2025 - Backend

Express.js backend API for the Prodigy MUN registration website.

## Local Development

```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Deployment to Render

1. **Connect your GitHub repository to Render**
2. **Create a new Web Service with these settings:**
   - Name: `prodigy-mun-backend`
   - Environment: `Node`
   - Root Directory: `./server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

3. **Set environment variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `8000`
   - `DATABASE_URL`: Your PostgreSQL connection string

4. **Deploy:**
   - Render will automatically build and deploy on every push to main branch

## Build Dependencies

All build dependencies (including `esbuild` and TypeScript types) are included in `dependencies` rather than `devDependencies` to ensure they're available during Render's build process.

## Production Build

The production build uses `index.prod.ts` which excludes Vite development dependencies, ensuring a clean build for deployment. This file contains only the Express server and API routes needed for production.

## Database Setup

This backend uses PostgreSQL with Drizzle ORM. 

### For Production Deployment:
1. Create a PostgreSQL database (recommended: Neon, Railway, or Render's PostgreSQL)
2. Add the `DATABASE_URL` environment variable to Render
3. The app will automatically create tables on first run

### Schema:
- `users` table: Admin credentials
- `registrations` table: Student registration data

## API Endpoints

- `GET /api/registrations` - Get all registrations (admin only)
- `POST /api/registrations` - Create new registration
- `GET /api/registrations/stats` - Get registration statistics
- `PATCH /api/registrations/:id/status` - Update registration status
- `DELETE /api/registrations/:id` - Delete registration
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout

## Features

- RESTful API design
- PostgreSQL database with Drizzle ORM
- Session-based authentication for admin
- Input validation with Zod schemas
- Error handling and logging
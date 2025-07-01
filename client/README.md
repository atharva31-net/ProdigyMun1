# Prodigy MUN 2025 - Frontend

React frontend for the Prodigy MUN registration website.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment to Netlify

1. **Connect your GitHub repository to Netlify**
2. **Configure build settings:**
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Node version: `20`

3. **Set up redirects:**
   The `netlify.toml` file in the root directory handles:
   - API proxy to backend server
   - SPA routing fallback to index.html

4. **Deploy:**
   - Netlify will automatically build and deploy on every push to main branch

## Environment Variables

- No environment variables needed for frontend
- Backend URL is configured via proxy in `netlify.toml`

## Features

- Student registration form with validation
- Admin dashboard for managing registrations
- Responsive design for mobile and desktop
- Real-time form validation
- Toast notifications
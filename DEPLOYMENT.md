# Deployment Guide - Prodigy MUN 2025

This guide provides step-by-step instructions for deploying the Prodigy MUN registration website with separate frontend (Netlify) and backend (Render) deployments.

## Prerequisites

- GitHub account
- Netlify account
- Render account
- Git installed locally

## Step 1: Prepare Your Repository

1. **Create a new GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Prodigy MUN 2025 registration website"
   git branch -M main
   git remote add origin https://github.com/yourusername/prodigy-mun-2025.git
   git push -u origin main
   ```

2. **Repository structure:**
   ```
   ├── client/           # Frontend code
   ├── server/           # Backend code
   ├── shared/           # Shared types
   ├── package.json      # Dependencies
   ├── netlify.toml      # Netlify configuration
   ├── render.yaml       # Render configuration
   ├── README.md         # Documentation
   └── DEPLOYMENT.md     # This file
   ```

## Step 2: Backend Deployment (Render)

### 2.1 Deploy Backend on Render

1. **Sign up/Login to Render:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub account

2. **Create a new Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Choose the repository you just created

3. **Configure the deployment:**
   - **Name**: `prodigy-mun-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build:server`
   - **Start Command**: `npm run start:server`
   - **Auto-Deploy**: `Yes` (deploys automatically on git push)

4. **Add Environment Variables:**
   - `NODE_ENV`: `production`
   - `PORT`: `8000`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://prodigy-mun-backend.onrender.com`)

### 2.2 Test Backend Deployment

1. **Verify API endpoints:**
   ```bash
   # Test registration stats endpoint
   curl https://your-backend-url.onrender.com/api/registrations/stats
   
   # Should return: {"total":0,"confirmed":0,"pending":0,"rejected":0}
   ```

## Step 3: Frontend Deployment (Netlify)

### 3.1 Update Backend URL

1. **Update the netlify.toml file:**
   - Replace `https://prodigy-mun-backend.onrender.com` with your actual Render backend URL
   - The file is already configured with proper redirects

### 3.2 Deploy Frontend on Netlify

1. **Sign up/Login to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub account

2. **Create a new site:**
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - **Branch to deploy**: `main`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Deploy:**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Note your frontend URL (e.g., `https://amazing-site-name.netlify.app`)

### 3.3 Test Frontend Deployment

1. **Verify website functionality:**
   - Open your Netlify URL
   - Test registration form
   - Test admin login (username: `prodigymun0`, password: `munprodiy#123@12@12`)
   - Verify that registrations are being saved and displayed in admin panel

## Step 4: Production Configuration

### 4.1 Custom Domain (Optional)

**For Netlify (Frontend):**
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions

**For Render (Backend):**
1. Go to Settings → Custom Domains
2. Add custom domain
3. Update netlify.toml with new backend URL

### 4.2 SSL Certificates

Both Netlify and Render provide automatic SSL certificates for custom domains.

## Step 5: Database Migration (Future)

Currently using in-memory storage. To migrate to PostgreSQL:

1. **Set up Neon Database:**
   ```bash
   # Sign up at neon.tech
   # Create new database
   # Get connection string
   ```

2. **Add environment variables to Render:**
   - `DATABASE_URL`: Your Neon connection string

3. **Update storage implementation:**
   - Switch from MemStorage to database storage
   - Run database migrations: `npm run db:push`

## Step 6: Monitoring and Maintenance

### 6.1 Monitoring

- **Render**: Built-in metrics and logs
- **Netlify**: Deploy logs and analytics
- Set up alerts for downtime

### 6.2 Updates

1. **Code updates:**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
   
2. **Automatic deployment:**
   - Both Render and Netlify will auto-deploy on git push
   - Monitor deployment logs for errors

## Troubleshooting

### Common Issues

1. **Build failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **API connection issues:**
   - Verify backend URL in netlify.toml
   - Check CORS configuration
   - Verify environment variables

3. **Admin login not working:**
   - Check hardcoded credentials in storage.ts
   - Verify session storage functionality

### Support

- **Render**: [render.com/docs](https://render.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **GitHub**: [docs.github.com](https://docs.github.com)

## Security Notes

1. **Admin Credentials:**
   - Current credentials are hardcoded for demo
   - In production, use environment variables
   - Implement proper password hashing

2. **Session Management:**
   - Currently using sessionStorage
   - Consider implementing JWT tokens for production

3. **Input Validation:**
   - All forms use Zod validation
   - Server-side validation is implemented
   - Consider rate limiting for production

## Performance Optimization

1. **Frontend:**
   - Static assets cached by Netlify CDN
   - Vite provides optimized builds
   - Consider implementing service workers

2. **Backend:**
   - In-memory storage is fast but not persistent
   - Consider Redis for session storage
   - Implement database connection pooling when using PostgreSQL

## Cost Estimates

- **Render**: Free tier available, paid plans start at $7/month
- **Netlify**: Free tier includes 100GB bandwidth, paid plans start at $19/month
- **Total estimated cost**: $0-26/month depending on usage

This deployment setup provides a production-ready, scalable solution for the Prodigy MUN 2025 registration website.
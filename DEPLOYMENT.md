# Deployment Guide - Prodigy MUN 2024

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
   git commit -m "Initial commit: Prodigy MUN registration website"
   git branch -M main
   git remote add origin https://github.com/yourusername/prodigy-mun-2024.git
   git push -u origin main
   ```

2. **Repository structure should look like:**
   ```
   ├── client/           # Frontend code
   ├── server/           # Backend code
   ├── shared/           # Shared types
   ├── package.json      # Dependencies
   ├── README.md         # Documentation
   └── DEPLOYMENT.md     # This file
   ```

## Step 2: Backend Deployment (Render)

### 2.1 Prepare Backend for Render

1. **Create `render.yaml` in your project root:**
   ```yaml
   services:
     - type: web
       name: prodigy-mun-backend
       env: node
       buildCommand: npm install && npm run build
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 8000
   ```

2. **Update `package.json` scripts (if needed):**
   ```json
   {
     "scripts": {
       "dev": "NODE_ENV=development tsx server/index.ts",
       "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
       "start": "NODE_ENV=production node dist/index.js"
     }
   }
   
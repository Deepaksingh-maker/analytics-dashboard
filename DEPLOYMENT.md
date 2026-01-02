# 🚀 Deployment Guide - Enhanced Analytics Dashboard

Complete guide to deploying your analytics dashboard to various platforms.

## 📋 Table of Contents

1. [Pre-deployment Checklist](#pre-deployment-checklist)
2. [Vercel Deployment](#vercel-deployment-recommended)
3. [Netlify Deployment](#netlify-deployment)
4. [GitHub Pages](#github-pages)
5. [Docker Deployment](#docker-deployment)
6. [AWS S3 + CloudFront](#aws-s3--cloudfront)
7. [Custom Server](#custom-server)
8. [Environment Variables](#environment-variables)
9. [Performance Optimization](#performance-optimization)

---

## ✅ Pre-deployment Checklist

Before deploying, ensure:

```bash
# 1. Test production build locally
npm run build
npm run preview

# 2. Check for console errors
# Open http://localhost:4173 and check browser console

# 3. Test responsive design
# Test on mobile, tablet, and desktop views

# 4. Verify all features work
# - Charts render correctly
# - Search and filters work
# - Export functionality works
# - Navigation is functional

# 5. Run lint (if configured)
npm run lint

# 6. Check bundle size
npm run build
# Look for dist/ folder size
```

---

## 🟦 Vercel Deployment (Recommended)

### Why Vercel?
- ⚡ Automatic builds on git push
- 🌍 Global CDN
- 💚 Free for personal projects
- 🔄 Automatic HTTPS

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd analytics-dashboard-enhanced
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? analytics-dashboard
# - Directory? ./
# - Override settings? No

# Production deployment
vercel --prod
```

### Method 2: GitHub Integration

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/analytics-dashboard.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Custom Domain** (Optional)
   - Go to project settings
   - Add custom domain
   - Update DNS records

### Vercel Configuration

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## 🟩 Netlify Deployment

### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build project
npm run build

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

### Method 2: Drag & Drop

1. **Build project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag `dist` folder to deploy area
   - Wait for deployment

### Method 3: GitHub Integration

1. **Connect repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Choose GitHub
   - Select repository

2. **Configure build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### Netlify Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 🟪 GitHub Pages

### Setup Steps

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/analytics-dashboard",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/analytics-dashboard/',
     plugins: [react()],
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub**
   - Go to repository Settings
   - Pages section
   - Source: gh-pages branch
   - Save

---

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile`:
```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:
```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
      try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }
  }
}
```

### Build and Run

```bash
# Build Docker image
docker build -t analytics-dashboard .

# Run container
docker run -d -p 80:80 analytics-dashboard

# Access at http://localhost
```

### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## ☁️ AWS S3 + CloudFront

### S3 Bucket Setup

```bash
# Install AWS CLI
# https://aws.amazon.com/cli/

# Configure AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://your-dashboard-bucket

# Enable static website hosting
aws s3 website s3://your-dashboard-bucket --index-document index.html

# Build and upload
npm run build
aws s3 sync dist/ s3://your-dashboard-bucket --delete

# Make public
aws s3api put-bucket-policy --bucket your-dashboard-bucket --policy file://bucket-policy.json
```

### bucket-policy.json

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-dashboard-bucket/*"
    }
  ]
}
```

### CloudFront Setup

1. Create CloudFront distribution
2. Origin: S3 bucket
3. Default root object: `index.html`
4. Enable HTTPS
5. Configure custom domain (optional)

---

## 🖥️ Custom Server

### Node.js Server

Create `server.js`:
```javascript
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Serve static files
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true
}));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Deploy Steps

```bash
# Install dependencies
npm install express compression

# Build
npm run build

# Start server
node server.js
```

---

## 🔐 Environment Variables

### Development (.env.local)

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Analytics Dashboard
VITE_ENABLE_ANALYTICS=false
```

### Production

**Vercel:**
```bash
vercel env add VITE_API_URL production
```

**Netlify:**
```bash
netlify env:set VITE_API_URL "https://api.example.com"
```

### Usage in Code

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## ⚡ Performance Optimization

### 1. Build Optimization

```bash
# Analyze bundle size
npm run build -- --mode production

# Use Vite analyzer plugin
npm install -D rollup-plugin-visualizer
```

### 2. Code Splitting

```javascript
// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));
```

### 3. Image Optimization

```bash
# Use WebP format
# Compress images before adding
# Use appropriate sizes
```

### 4. Caching Strategy

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts']
        }
      }
    }
  }
})
```

### 5. Lighthouse Optimization

- Enable compression
- Minimize CSS/JS
- Lazy load images
- Use CDN for assets
- Enable browser caching

---

## 🎯 Deployment Comparison

| Platform | Cost | Speed | Ease | Best For |
|----------|------|-------|------|----------|
| Vercel | Free/Paid | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Quick deploys |
| Netlify | Free/Paid | ⚡⚡⚡⚡⚡ | ⭐⭐⭐⭐⭐ | Static sites |
| GitHub Pages | Free | ⚡⚡⚡ | ⭐⭐⭐⭐ | Open source |
| Docker | Variable | ⚡⚡⚡⚡ | ⭐⭐⭐ | Self-hosted |
| AWS | Pay-as-go | ⚡⚡⚡⚡⚡ | ⭐⭐ | Enterprise |

---

## 🔍 Post-Deployment Testing

### Checklist

```bash
# 1. Test live URL
# Open in browser, check all features

# 2. Test performance
# Run Lighthouse audit
# Check load times

# 3. Test responsive
# Test on real devices
# Check all breakpoints

# 4. Test functionality
# - All routes work
# - Charts render
# - Search works
# - Export works
# - Filters work

# 5. Monitor errors
# Check browser console
# Set up error tracking (Sentry, etc.)
```

---

## 📊 Monitoring & Analytics

### Add Google Analytics

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react

# In main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE
});
```

---

## 🆘 Troubleshooting

### Common Issues

**404 on refresh:**
- Configure server redirects
- Update routing configuration

**Assets not loading:**
- Check `base` in vite.config.js
- Verify asset paths

**Environment variables not working:**
- Prefix with `VITE_`
- Rebuild after changes

---

**Ready to deploy! Choose your platform and follow the guide above. 🚀**

*Last Updated: January 2026*

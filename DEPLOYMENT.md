# SUKUNERGY Deployment Guide

This guide provides multiple deployment strategies for the SUKUNERGY e-commerce platform.

## 🚨 32-bit Windows Development Issue

**Current Status**: The application has a known issue with Next.js SWC compiler on 32-bit Windows systems. The development server runs but building for production fails due to SWC binary compatibility.

**Workaround**: Deploy to cloud platforms (Vercel, Railway, etc.) which use 64-bit systems where SWC works correctly.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment with automatic builds and PostgreSQL database.

#### Prerequisites
- GitHub account
- Vercel account (free tier available)
- PostgreSQL database (Neon.tech recommended)

#### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial SUKUNERGY deployment"
   git branch -M main
   git remote add origin https://github.com/yourusername/sukunergy.git
   git push -u origin main
   ```

2. **Create PostgreSQL Database**
   - Go to [Neon.tech](https://neon.tech) and create free account
   - Create new database
   - Copy connection string

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Configure environment variables:

   ```env
   # Brand & Contact
   NEXT_PUBLIC_BRAND_NAME=SUKUNERGY
   NEXT_PUBLIC_WA_NUMBER=6281234567890
   SUPPORT_EMAIL=hello@sukunergy.id
   NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app

   # Social Media Links
   NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/sukunergy
   NEXT_PUBLIC_SHOPEE_URL=https://shopee.co.id/sukunergy
   NEXT_PUBLIC_TIKTOK_SHOP_URL=https://tiktok.com/@sukunergy/shop
   NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/sukunergy

   # Database (PostgreSQL from Neon)
   DATABASE_URL=postgresql://username:password@host/database

   # Authentication
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-super-secret-key-here

   # Optional: File Upload
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   ```

4. **Run Database Migration**
   After first successful deployment:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and link project
   vercel login
   vercel link

   # Run migration
   vercel env pull .env.local
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Option 2: Railway

Railway provides simple deployment with built-in PostgreSQL.

1. **Push to GitHub** (same as Vercel)

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Add PostgreSQL service
   - Configure environment variables (same as Vercel)
   - Deploy automatically triggers

### Option 3: Docker Deployment

For VPS or cloud servers supporting Docker.

1. **Build Docker Image**
   ```bash
   docker build -t sukunergy .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your-postgres-url" \
     -e NEXTAUTH_SECRET="your-secret" \
     -e NEXT_PUBLIC_WA_NUMBER="6281234567890" \
     sukunergy
   ```

### Option 4: Traditional VPS

For Ubuntu/CentOS servers.

1. **Server Requirements**
   - Node.js 18+ (64-bit)
   - PostgreSQL 14+
   - Nginx (recommended)
   - PM2 for process management

2. **Installation**
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/sukunergy.git
   cd sukunergy

   # Install dependencies
   npm install

   # Setup environment
   cp env.example .env
   # Edit .env with production values

   # Setup database
   npx prisma migrate deploy
   npx prisma db seed

   # Build application
   npm run build

   # Install PM2
   npm install -g pm2

   # Start application
   pm2 start npm --name "sukunergy" -- start
   pm2 startup
   pm2 save
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Environment Configuration

### Required Environment Variables

```env
# Core Settings
NEXT_PUBLIC_BRAND_NAME=SUKUNERGY
NEXT_PUBLIC_WA_NUMBER=6281234567890
SUPPORT_EMAIL=hello@sukunergy.id
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Social Media
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/sukunergy
NEXT_PUBLIC_SHOPEE_URL=https://shopee.co.id/sukunergy
NEXT_PUBLIC_TIKTOK_SHOP_URL=https://tiktok.com/@sukunergy/shop
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/sukunergy

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate-random-32-char-string

# Optional: Analytics
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Database Migration Commands

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate deploy

# Seed initial data
npx prisma db seed

# Reset database (development only)
npx prisma migrate reset
```

## 📊 Performance Optimization

### Pre-deployment Checklist

- [ ] Optimize images (WebP format recommended)
- [ ] Configure CDN for static assets
- [ ] Enable gzip compression
- [ ] Set up monitoring (Vercel Analytics, Google Analytics)
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring

### Lighthouse Targets
- Performance: ≥90
- SEO: ≥90
- Best Practices: ≥90
- Accessibility: ≥90

## 🔒 Security Considerations

### Production Security
- Change default admin password immediately
- Use strong NEXTAUTH_SECRET (32+ characters)
- Enable HTTPS (automatic on Vercel/Railway)
- Configure CORS if needed
- Set up rate limiting for API routes
- Regular dependency updates

### Environment Security
- Never commit .env files
- Use different secrets for each environment
- Rotate secrets regularly
- Use database connection pooling
- Configure firewall rules

## 🐛 Troubleshooting

### Common Deployment Issues

1. **Build Fails on 32-bit Systems**
   - Deploy on 64-bit cloud platforms
   - Use GitHub Codespaces for development

2. **Database Connection Issues**
   - Check DATABASE_URL format
   - Ensure database allows external connections
   - Verify SSL requirements

3. **Environment Variables Not Working**
   - Prefix public variables with NEXT_PUBLIC_
   - Restart application after changes
   - Check Vercel/Railway dashboard settings

4. **WhatsApp Links Not Working**
   - Ensure phone number format (no + or spaces)
   - Check URL encoding in messages
   - Test on mobile devices

### Monitoring and Logs

```bash
# Vercel logs
vercel logs

# Railway logs
railway logs

# PM2 logs
pm2 logs sukunergy

# Docker logs
docker logs container-name
```

## 🚀 CI/CD Pipeline

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Post-Deployment

### After Successful Deployment

1. **Test Core Functionality**
   - [ ] Landing page loads
   - [ ] Product pages work
   - [ ] Cart functionality
   - [ ] WhatsApp integration
   - [ ] Admin panel access

2. **Configure Analytics**
   - Set up Google Analytics
   - Configure Vercel Analytics
   - Set up error monitoring

3. **SEO Setup**
   - Submit sitemap to Google Search Console
   - Configure social media meta tags
   - Test structured data

4. **Performance Monitoring**
   - Run Lighthouse audits
   - Set up uptime monitoring
   - Configure performance alerts

---

**Need Help?** 
- 📧 Email: hello@sukunergy.id
- 💬 WhatsApp: +6281234567890
- 🐛 Issues: GitHub Issues

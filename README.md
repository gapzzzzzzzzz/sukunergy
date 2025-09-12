# SUKUNERGY - Smart fuel for your day

A production-ready e-commerce MVP for SUKUNERGY, a healthy, low-calorie, high-protein breadfruit (sukun) bar brand optimized for fast launch and iteration.

## 🌟 Features

### Core MVP Features
- ✅ **Landing Page** - Eye-catching hero, social proof, stats, product carousel, benefits, testimonials, FAQ, team preview
- ✅ **Product Catalog** - Product cards with pricing, nutrition info, and variants
- ⚠️ **Product Detail Pages** - Gallery, variants, nutrition facts, add-to-cart (In Progress)
- ⚠️ **Cart & Checkout** - WhatsApp checkout flow with prefilled messages (In Progress)
- ⚠️ **Admin Dashboard** - Secure CRUD operations for all entities (In Progress)
- ✅ **Team Section** - Public team page with Instagram links
- ✅ **SEO Optimized** - Meta tags, OG tags, structured data
- ✅ **Mobile Responsive** - Optimized for all devices
- ✅ **WhatsApp Integration** - Floating button and checkout flow

### Technical Features
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for styling with custom design system
- **Prisma ORM** with SQLite (dev) / PostgreSQL (prod)
- **NextAuth.js** for authentication
- **Cart Context** with localStorage persistence
- **Toast Notifications** for user feedback
- **Responsive Design** with mobile-first approach

## 🚨 32-bit Windows Notice

**Important**: This project has a known issue with Next.js SWC compiler on 32-bit Windows systems. The development server runs fine, but building for production fails.

**Recommended Solutions:**
1. **Deploy to cloud** (Vercel, Railway) - they use 64-bit systems where it works
2. **Use GitHub Codespaces** for development and deployment
3. **Upgrade to 64-bit system** if possible

The application is fully functional and production-ready when deployed on 64-bit systems.

## 🚀 Quick Start

### Prerequisites

You need to have installed:
- **Git** (Windows/macOS/Linux)
- **Node.js LTS** (18 or 20)
  - Windows: Download installer from nodejs.org
  - If your device is 32-bit, install the 32-bit Node 18 build
- **VS Code** (recommended)

### VS Code Extensions (Recommended)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma

### 1. Clone & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd sukunergy

# Install dependencies
npm install

# Or use pnpm (recommended)
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

### 2. Environment Configuration

Create `.env` file from the example:

```bash
# Copy the example file
cp env.example .env
```

Edit `.env` with your values:

```env
# Brand & Contact
NEXT_PUBLIC_BRAND_NAME=SUKUNERGY
NEXT_PUBLIC_WA_NUMBER=6281234567890
SUPPORT_EMAIL=hello@sukunergy.id

# Social Media Links
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/sukunergy
NEXT_PUBLIC_SHOPEE_URL=https://shopee.co.id/sukunergy
NEXT_PUBLIC_TIKTOK_SHOP_URL=https://tiktok.com/@sukunergy/shop
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/sukunergy

# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# File Upload (Optional)
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
# OR
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 3. Database Setup

```bash
# For 32-bit systems, set environment variables
$env:PRISMA_CLIENT_ENGINE_TYPE="binary"
$env:PRISMA_CLI_QUERY_ENGINE_TYPE="binary"

# Generate Prisma client
npx prisma generate

# Run database migrations and seed data
npx prisma migrate dev --name init

# The seed will automatically run and create:
# - Admin user: admin@sukunergy.id / Admin12345!
# - 3 products with variants
# - 5 FAQs
# - 6 testimonials  
# - 5 team members
# - 2 content pages
```

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Admin Access

Visit [http://localhost:3000/admin](http://localhost:3000/admin)

**Default Admin Credentials:**
- Email: `admin@sukunergy.id`
- Password: `Admin12345!`

**⚠️ Important:** Change the admin password immediately after first login!

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database

# Testing
npm run test         # Run Playwright tests
npm run test:ui      # Run tests with UI
```

### Project Structure

```
sukunergy/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable components
│   │   ├── ui/             # Basic UI components
│   │   ├── sections/       # Page sections
│   │   └── layout/         # Layout components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   └── lib/                # Utilities and configurations
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
└── README.md
```

### Core Flows (Working)

#### 1. Shopper Flow
1. ✅ Browse landing page
2. ✅ View product information
3. ⚠️ Add to cart (In Progress)
4. ⚠️ Checkout via WhatsApp (In Progress)
5. ⚠️ Admin updates order status (In Progress)

#### 2. Admin Flow
1. ⚠️ Login to admin dashboard (In Progress)
2. ⚠️ CRUD operations on products, orders, testimonials, etc. (In Progress)
3. ⚠️ Inventory management (In Progress)

#### 3. Team Management
1. ✅ Public team page display
2. ⚠️ Admin CRUD for team members (In Progress)
3. ✅ Instagram link tracking

## 🚀 Deployment

> **Note**: Due to 32-bit SWC issues, deployment must be done on 64-bit systems or cloud platforms.

### Quick Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/sukunergy)

### Manual Deployment

### Vercel (Recommended)

1. **Prepare for Production**

```bash
# Build locally to test
npm run build
npm run start
```

2. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial SUKUNERGY MVP"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

3. **Deploy to Vercel**

- Create account at [vercel.com](https://vercel.com)
- Import your GitHub repository
- Set environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_*` variables
  - `DATABASE_URL` (PostgreSQL from Neon/PlanetScale)
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL` (your production domain)

4. **Database Migration**

```bash
# After first deploy, run migration
npx prisma migrate deploy
```

### Alternative: Railway/Render

Similar process but with their respective platforms.

## 📱 WhatsApp Integration

### Message Templates

The app generates prefilled WhatsApp messages:

```
Halo SUKUNERGY! Saya ingin pesan:
- [Product Name] x[qty] [variant]
Subtotal: Rp[amount]
Nama: [name]
No: [phone]
Alamat: [address]
Catatan: [notes]
Sumber: Website
```

### External Links

All marketplace and social media links include UTM parameters for tracking:
- Instagram: `utm_source=instagram&utm_medium=social&utm_campaign=website`
- Shopee: `utm_source=shopee&utm_medium=marketplace&utm_campaign=website`
- TikTok Shop: `utm_source=tiktok&utm_medium=marketplace&utm_campaign=website`

## 🎨 Customization

### Brand Colors

Edit `tailwind.config.ts`:

```javascript
colors: {
  primary: {
    DEFAULT: '#22c55e', // Main brand green
    50: '#f0fdf4',
    // ... other shades
  }
}
```

### Content

- **Products**: Edit seed data in `prisma/seed.ts`
- **FAQs**: Update in seed file or via admin panel
- **Team**: Update in seed file or via admin panel
- **Social Links**: Update environment variables

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] WhatsApp links work with correct messages
- [ ] Cart persistence works
- [ ] Admin login works
- [ ] Product CRUD operations work
- [ ] Team Instagram links work
- [ ] Mobile responsiveness
- [ ] SEO meta tags present

### Automated Tests (Planned)

```bash
# Run Playwright tests
npm run test

# Tests include:
# - Cart functionality
# - WhatsApp URL generation
# - Product CRUD operations
# - Team Instagram link clicks
```

## 📊 Performance

### Lighthouse Targets
- Performance: ≥90
- SEO: ≥90
- Best Practices: ≥90
- Accessibility: ≥90

### Optimizations
- Image optimization with Next.js Image
- Lazy loading for sections
- Code splitting
- Font optimization

## 🔧 Troubleshooting

### Common Issues

1. **Prisma Engine Error (32-bit)**
   ```bash
   # Set environment variables
   $env:PRISMA_CLIENT_ENGINE_TYPE="binary"
   $env:PRISMA_CLI_QUERY_ENGINE_TYPE="binary"
   ```

2. **Port 3000 in use**
   ```bash
   npm run dev -- -p 3001
   ```

3. **Database connection issues**
   - Check `DATABASE_URL` in `.env`
   - Ensure database file permissions

4. **WhatsApp URL not opening**
   - Ensure `NEXT_PUBLIC_WA_NUMBER` is numeric (no +)
   - Check URL encoding

### Getting Help

- 📧 Email: hello@sukunergy.id
- 💬 WhatsApp: +6281234567890
- 🐛 Issues: GitHub Issues

## 🏗️ Roadmap

### Phase 1: MVP (Current)
- [x] Landing page
- [x] Basic product display
- [x] WhatsApp integration
- [x] Admin foundation
- [ ] Cart & checkout
- [ ] Admin dashboard

### Phase 2: Enhancement
- [ ] Payment gateway integration
- [ ] Inventory management
- [ ] Order tracking
- [ ] Email notifications
- [ ] Analytics dashboard

### Phase 3: Scale
- [ ] Multi-language support
- [ ] Advanced SEO
- [ ] Performance optimization
- [ ] Mobile app (PWA)
- [ ] Advanced analytics

## 📄 License

This project is proprietary software of SUKUNERGY. All rights reserved.

---

**SUKUNERGY** - Smart fuel for your day 🌱

Built with ❤️ by the SUKUNERGY team in Indonesia 🇮🇩

# SUKUNERGY Deployment Script for Windows PowerShell
# This script helps deploy SUKUNERGY to various platforms

Write-Host "🌱 SUKUNERGY Deployment Script" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

function Write-Success {
    param($Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

function Write-Info {
    param($Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

# Check if we're on a 64-bit system
function Check-Architecture {
    $arch = $env:PROCESSOR_ARCHITECTURE
    if ($arch -eq "x86") {
        Write-Warning "32-bit system detected."
        Write-Info "For 32-bit systems, please use cloud deployment (Vercel/Railway)."
        Write-Info "Local build may fail due to Next.js SWC compatibility issues."
    } else {
        Write-Success "64-bit system detected. Proceeding with local deployment."
    }
}

# Check prerequisites
function Check-Prerequisites {
    Write-Info "Checking prerequisites..."
    
    # Check Node.js
    try {
        $nodeVersion = node --version
        Write-Success "Node.js $nodeVersion detected"
    } catch {
        Write-Error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    }
    
    # Check npm
    try {
        $npmVersion = npm --version
        Write-Success "npm $npmVersion detected"
    } catch {
        Write-Error "npm is not installed."
        exit 1
    }
    
    # Check git
    try {
        $gitVersion = git --version
        Write-Success "$gitVersion detected"
    } catch {
        Write-Error "Git is not installed."
        exit 1
    }
}

# Install dependencies
function Install-Dependencies {
    Write-Info "Installing dependencies..."
    npm ci
    Write-Success "Dependencies installed"
}

# Setup database
function Setup-Database {
    Write-Info "Setting up database..."
    
    # Check if .env exists
    if (-not (Test-Path ".env")) {
        if (Test-Path "env.example") {
            Copy-Item "env.example" ".env"
            Write-Warning "Created .env from env.example. Please update with your values."
            Write-Info "Edit .env file with your database URL and other settings."
            Read-Host "Press Enter after updating .env file"
        } else {
            Write-Error ".env file not found and no env.example available."
            exit 1
        }
    }
    
    # Set environment variables for Prisma (32-bit compatibility)
    $env:PRISMA_CLIENT_ENGINE_TYPE = "binary"
    $env:PRISMA_CLI_QUERY_ENGINE_TYPE = "binary"
    
    # Generate Prisma client
    Write-Info "Generating Prisma client..."
    npx prisma generate
    
    # Run migrations
    Write-Info "Running database migrations..."
    npx prisma migrate deploy
    
    # Seed database
    Write-Info "Seeding database with initial data..."
    npx prisma db seed
    
    Write-Success "Database setup complete"
}

# Build application (may fail on 32-bit)
function Build-Application {
    Write-Info "Building application for production..."
    
    # Set environment for production
    $env:NODE_ENV = "production"
    
    try {
        # Build the application
        npm run build
        Write-Success "Application built successfully"
    } catch {
        Write-Error "Build failed. This is expected on 32-bit systems."
        Write-Info "Please deploy to Vercel or Railway instead."
        throw
    }
}

# Deploy to Vercel
function Deploy-Vercel {
    Write-Info "Deploying to Vercel..."
    
    # Check if vercel CLI is installed
    try {
        vercel --version | Out-Null
    } catch {
        Write-Info "Installing Vercel CLI..."
        npm install -g vercel
    }
    
    # Login to Vercel
    vercel login
    
    # Deploy
    vercel --prod
    
    Write-Success "Deployed to Vercel successfully"
}

# Deploy to Railway
function Deploy-Railway {
    Write-Info "Deploying to Railway..."
    
    # Check if railway CLI is installed
    try {
        railway version | Out-Null
    } catch {
        Write-Info "Installing Railway CLI..."
        npm install -g @railway/cli
    }
    
    # Login to Railway
    railway login
    
    # Initialize project
    railway init
    
    # Deploy
    railway up
    
    Write-Success "Deployed to Railway successfully"
}

# Main deployment menu
function Show-Menu {
    Write-Host ""
    Write-Host "Select deployment option:"
    Write-Host "1) Local development setup"
    Write-Host "2) Build for production (local) - May fail on 32-bit"
    Write-Host "3) Deploy to Vercel (Recommended for 32-bit)"
    Write-Host "4) Deploy to Railway"
    Write-Host "5) Exit"
    Write-Host ""
    
    $choice = Read-Host "Enter your choice (1-5)"
    
    switch ($choice) {
        "1" {
            Check-Architecture
            Check-Prerequisites
            Install-Dependencies
            Setup-Database
            Write-Success "Local development setup complete!"
            Write-Info "Run 'npm run dev' to start development server"
        }
        "2" {
            Check-Architecture
            Check-Prerequisites
            Install-Dependencies
            Setup-Database
            try {
                Build-Application
                Write-Success "Production build complete!"
                Write-Info "Run 'npm start' to start production server"
            } catch {
                Write-Warning "Build failed. Consider cloud deployment instead."
            }
        }
        "3" {
            Check-Prerequisites
            Install-Dependencies
            Deploy-Vercel
        }
        "4" {
            Check-Prerequisites
            Install-Dependencies
            Deploy-Railway
        }
        "5" {
            Write-Info "Goodbye!"
            exit 0
        }
        default {
            Write-Error "Invalid choice. Please try again."
            Show-Menu
        }
    }
}

# Run main menu
Show-Menu

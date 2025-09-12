#!/bin/bash

# SUKUNERGY Deployment Script
# This script helps deploy SUKUNERGY to various platforms

set -e

echo "🌱 SUKUNERGY Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if we're on a 64-bit system
check_architecture() {
    ARCH=$(uname -m)
    if [[ "$ARCH" != "x86_64" && "$ARCH" != "amd64" ]]; then
        print_warning "This script is optimized for 64-bit systems."
        print_info "For 32-bit systems, please use cloud deployment (Vercel/Railway)."
    else
        print_status "64-bit system detected. Proceeding with local deployment."
    fi
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ required. Current version: $(node -v)"
        exit 1
    fi
    print_status "Node.js $(node -v) detected"
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi
    print_status "npm $(npm -v) detected"
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed."
        exit 1
    fi
    print_status "Git $(git --version | cut -d' ' -f3) detected"
}

# Install dependencies
install_dependencies() {
    print_info "Installing dependencies..."
    npm ci
    print_status "Dependencies installed"
}

# Setup database
setup_database() {
    print_info "Setting up database..."
    
    # Check if .env exists
    if [ ! -f .env ]; then
        if [ -f env.example ]; then
            cp env.example .env
            print_warning "Created .env from env.example. Please update with your values."
            print_info "Edit .env file with your database URL and other settings."
            read -p "Press Enter after updating .env file..."
        else
            print_error ".env file not found and no env.example available."
            exit 1
        fi
    fi
    
    # Generate Prisma client
    print_info "Generating Prisma client..."
    npx prisma generate
    
    # Run migrations
    print_info "Running database migrations..."
    npx prisma migrate deploy
    
    # Seed database
    print_info "Seeding database with initial data..."
    npx prisma db seed
    
    print_status "Database setup complete"
}

# Build application
build_application() {
    print_info "Building application for production..."
    
    # Set environment for production
    export NODE_ENV=production
    
    # Build the application
    npm run build
    
    print_status "Application built successfully"
}

# Deploy to Vercel
deploy_vercel() {
    print_info "Deploying to Vercel..."
    
    # Check if vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_info "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Login to Vercel
    vercel login
    
    # Deploy
    vercel --prod
    
    print_status "Deployed to Vercel successfully"
}

# Deploy to Railway
deploy_railway() {
    print_info "Deploying to Railway..."
    
    # Check if railway CLI is installed
    if ! command -v railway &> /dev/null; then
        print_info "Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    # Login to Railway
    railway login
    
    # Initialize project
    railway init
    
    # Deploy
    railway up
    
    print_status "Deployed to Railway successfully"
}

# Main deployment menu
main_menu() {
    echo ""
    echo "Select deployment option:"
    echo "1) Local development setup"
    echo "2) Build for production (local)"
    echo "3) Deploy to Vercel"
    echo "4) Deploy to Railway"
    echo "5) Exit"
    echo ""
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            check_architecture
            check_prerequisites
            install_dependencies
            setup_database
            print_status "Local development setup complete!"
            print_info "Run 'npm run dev' to start development server"
            ;;
        2)
            check_architecture
            check_prerequisites
            install_dependencies
            setup_database
            build_application
            print_status "Production build complete!"
            print_info "Run 'npm start' to start production server"
            ;;
        3)
            check_prerequisites
            install_dependencies
            deploy_vercel
            ;;
        4)
            check_prerequisites
            install_dependencies
            deploy_railway
            ;;
        5)
            print_info "Goodbye!"
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please try again."
            main_menu
            ;;
    esac
}

# Run main menu
main_menu

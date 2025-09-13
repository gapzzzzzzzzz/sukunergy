'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Star, Award, Leaf, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const heroImages = [
  {
    src: '/images/hero/hero-1.jpg',
    alt: 'SUKUNERGY Original Bar',
    product: 'Original',
  },
  {
    src: '/images/hero/hero-2.jpg',
    alt: 'SUKUNERGY Chocolate Bar',
    product: 'Chocolate',
  },
  {
    src: '/images/hero/hero-3.jpg',
    alt: 'SUKUNERGY Mixed Nuts Bar',
    product: 'Mixed Nuts',
  },
];

const trustBadges = [
  { icon: Award, text: 'Halal Certified', color: 'text-green-600' },
  { icon: Leaf, text: '100% Natural', color: 'text-green-600' },
  { icon: Zap, text: 'High Protein', color: 'text-blue-600' },
  { icon: Star, text: '4.9/5 Rating', color: 'text-yellow-600' },
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      'Halo SUKUNERGY! Saya ingin memesan produk protein bar sukun. Bisa dibantu untuk informasi dan pemesanannya?'
    );
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${message}`;
    
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_wa_order_clicked', {
        event_category: 'conversion',
        event_label: 'hero_cta',
      });
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/patterns/sukun-pattern.svg')] opacity-5"></div>
      
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000',
              index === currentImageIndex ? 'opacity-20' : 'opacity-0'
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <Badge variant="new" className="mb-4 animate-fade-in">
              🌟 Produk Lokal Indonesia Terbaik
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
              <span className="text-primary">SUKUNERGY</span>
              <br />
              Smart fuel for your day
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl animate-slide-up">
              Bar protein sukun sehat, rendah kalori, tinggi protein. 
              Camilan bergizi berbahan lokal Indonesia untuk mendukung gaya hidup aktif Anda.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">130</div>
                <div className="text-sm text-gray-600">Kalori/bar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">15g</div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">4g</div>
                <div className="text-sm text-gray-600">Serat</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 animate-slide-up max-w-lg mx-auto lg:mx-0">
              <Button
                size="lg"
                onClick={handleWhatsAppOrder}
                className="group w-full sm:w-auto sm:flex-1"
              >
                <span className="hidden sm:inline">Order via WhatsApp</span>
                <span className="sm:hidden">Pesan via WhatsApp</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto sm:flex-1"
              >
                <Link href="/products">
                  Lihat Produk
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsVideoModalOpen(true)}
                className="group w-full sm:w-auto"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Tonton Video</span>
                <span className="sm:hidden">Video</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-slide-up">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm"
                >
                  <badge.icon className={cn('h-4 w-4', badge.color)} />
                  <span className="text-sm font-medium text-gray-700">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Showcase */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 animate-fade-in">
              <Image
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                width={600}
                height={600}
                className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-2xl shadow-2xl"
                priority
              />
              
              {/* Product Name Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="featured" className="w-full justify-center py-2">
                  SUKUNERGY {heroImages[currentImageIndex].product}
                </Badge>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce-gentle">
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-primary rounded-full p-4 shadow-lg animate-bounce-gentle">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                index === currentImageIndex
                  ? 'bg-primary'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
            >
              ✕
            </button>
            {/* Replace with actual video embed */}
            <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white">
              <p>Video demo SUKUNERGY akan segera tersedia</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

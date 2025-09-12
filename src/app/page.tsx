import { Suspense } from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { ProductsSection } from '@/components/sections/products-section';
import { BenefitsSection } from '@/components/sections/benefits-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FAQSection } from '@/components/sections/faq-section';
import { TeamSection } from '@/components/sections/team-section';
import { CTASection } from '@/components/sections/cta-section';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { generateSEOMetadata } from '@/lib/utils';

export const metadata: Metadata = generateSEOMetadata({
  title: 'SUKUNERGY - Smart fuel for your day',
  description: 'Bar protein sukun sehat, rendah kalori, tinggi protein. Camilan sehat berbahan lokal Indonesia untuk gaya hidup aktif Anda.',
  path: '/',
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection />
        
        <Suspense fallback={<div className="h-32 bg-gray-50 animate-pulse" />}>
          <StatsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <ProductsSection />
        </Suspense>
        
        <BenefitsSection />
        
        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <FAQSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse" />}>
          <TeamSection />
        </Suspense>
        
        <CTASection />
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

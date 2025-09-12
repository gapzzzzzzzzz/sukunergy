'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      'Halo SUKUNERGY! Saya siap untuk memulai hidup sehat dengan produk protein bar sukun Anda. Bisa tolong bantu saya memilih produk yang tepat?'
    );
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${message}`;
    
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'cta_wa_order_clicked', {
        event_category: 'conversion',
        event_label: 'cta_section',
      });
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-green-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Memulai Hidup Sehat Bersama SUKUNERGY?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
            Bergabunglah dengan ribuan orang yang telah merasakan manfaat luar biasa dari protein bar sukun terbaik Indonesia. 
            Mulai hari ini, rasakan perbedaannya!
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="xl"
              onClick={handleWhatsAppOrder}
              className="bg-white text-primary hover:bg-gray-50 group"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Order Sekarang via WhatsApp
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              asChild
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Lihat Semua Produk
              </Link>
            </Button>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-2xl font-bold text-white mb-2">💬</div>
            <h3 className="font-semibold text-white mb-2">Konsultasi Gratis</h3>
            <p className="text-sm text-green-100 mb-3">
              Tanya jawab seputar produk dan manfaatnya
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWhatsAppOrder}
              className="text-white hover:bg-white/20"
            >
              Chat Sekarang
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-2xl font-bold text-white mb-2">📦</div>
            <h3 className="font-semibold text-white mb-2">Gratis Ongkir</h3>
            <p className="text-sm text-green-100 mb-3">
              Untuk pembelian minimal 3 pack ke seluruh Indonesia
            </p>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-white hover:bg-white/20"
            >
              <Link href="/products">
                Lihat Promo
              </Link>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-2xl font-bold text-white mb-2">🎁</div>
            <h3 className="font-semibold text-white mb-2">Paket Hemat</h3>
            <p className="text-sm text-green-100 mb-3">
              Dapatkan diskon hingga 25% untuk paket besar
            </p>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-white hover:bg-white/20"
            >
              <Link href="/products">
                Pilih Paket
              </Link>
            </Button>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-green-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">✅ Halal & BPOM</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">🚚 Pengiriman Cepat</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">💯 Garansi Kualitas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">⭐ 10,000+ Pelanggan Puas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

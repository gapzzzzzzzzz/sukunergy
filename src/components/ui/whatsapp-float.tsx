'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Show tooltip after a delay when component becomes visible
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setShowTooltip(false);
    }
  }, [isVisible]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Halo SUKUNERGY! Saya tertarik dengan produk protein bar sukun Anda. Bisakah Anda memberikan informasi lebih lanjut?'
    );
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${message}`;
    
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'wa_float_clicked', {
        event_category: 'engagement',
        event_label: 'whatsapp_float',
      });
    }
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 animate-slide-up">
          <div className="bg-white rounded-lg shadow-lg border p-3 max-w-xs relative">
            <button
              onClick={handleTooltipClose}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 p-1"
              aria-label="Close tooltip"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-sm text-gray-700 pr-4">
              💬 <strong>Butuh bantuan?</strong><br />
              Chat langsung dengan tim kami!
            </p>
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b"></div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        size="lg"
        className={cn(
          'whatsapp-float shadow-lg hover:shadow-xl',
          'bg-green-500 hover:bg-green-600 text-white',
          'w-14 h-14 rounded-full',
          'animate-bounce-gentle'
        )}
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
    </div>
  );
}

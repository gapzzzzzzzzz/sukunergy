import Link from 'next/link';
import { Instagram, MessageCircle, ShoppingBag, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addUTMParams } from '@/lib/utils';

const footerLinks = {
  product: [
    { name: 'Semua Produk', href: '/products' },
    { name: 'SUKUNERGY Original', href: '/products/sukunergy-original' },
    { name: 'SUKUNERGY Chocolate', href: '/products/sukunergy-chocolate' },
    { name: 'SUKUNERGY Mixed Nuts', href: '/products/sukunergy-mixed-nuts' },
  ],
  company: [
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Tim Kami', href: '/team' },
    { name: 'Mengapa Sukun?', href: '/why-breadfruit' },
    { name: 'Kontak', href: '/contact' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Cara Konsumsi', href: '/cara-konsumsi-penyimpanan' },
    { name: 'Kebijakan Privasi', href: '/privacy-policy' },
    { name: 'Syarat & Ketentuan', href: '/terms-of-service' },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/sukunergy',
    icon: Instagram,
    color: 'instagram',
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`,
    icon: MessageCircle,
    color: 'whatsapp',
  },
  {
    name: 'Shopee',
    href: process.env.NEXT_PUBLIC_SHOPEE_URL || 'https://shopee.co.id/sukunergy',
    icon: ShoppingBag,
    color: 'shopee',
  },
  {
    name: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/sukunergy',
    icon: Linkedin,
    color: 'linkedin',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <span>SUKUNERGY</span>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Smart fuel for your day. Bar protein sukun sehat, rendah kalori, tinggi protein untuk gaya hidup aktif Anda.
            </p>
            <p className="text-gray-400 text-xs">
              Mendukung produk lokal Indonesia 🇮🇩
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Produk</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Bantuan</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Contact */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="font-semibold text-white mb-2">Ikuti Kami</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant={social.color as any}
                    size="icon"
                    asChild
                  >
                    <Link
                      href={addUTMParams(social.href, social.name.toLowerCase(), 'social', 'footer')}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-300 text-sm mb-2">
                Hubungi Kami
              </p>
              <p className="text-gray-400 text-xs">
                Email: {process.env.SUPPORT_EMAIL || 'hello@sukunergy.id'}
              </p>
              <p className="text-gray-400 text-xs">
                WhatsApp: +{process.env.NEXT_PUBLIC_WA_NUMBER || '6281234567890'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} SUKUNERGY. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-gray-400">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="hover:text-primary transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

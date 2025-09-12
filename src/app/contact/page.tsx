import { Metadata } from 'next';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSEOMetadata } from '@/lib/utils';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Kontak Kami - SUKUNERGY',
  description: 'Hubungi tim SUKUNERGY untuk pertanyaan, saran, atau pemesanan. Tersedia layanan customer service 24/7 via WhatsApp dan email.',
  path: '/contact',
});

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Chat langsung dengan tim customer service kami',
    value: `+${process.env.NEXT_PUBLIC_WA_NUMBER}`,
    action: 'Chat Sekarang',
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent('Halo SUKUNERGY! Saya ingin bertanya tentang produk Anda.')}`,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Kirim pertanyaan detail via email',
    value: process.env.SUPPORT_EMAIL || 'hello@sukunergy.id',
    action: 'Kirim Email',
    href: `mailto:${process.env.SUPPORT_EMAIL || 'hello@sukunergy.id'}?subject=Pertanyaan tentang SUKUNERGY`,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: MapPin,
    title: 'Lokasi',
    description: 'Kantor pusat kami',
    value: 'Surabaya, Jawa Timur, Indonesia',
    action: 'Lihat Peta',
    href: 'https://maps.google.com/?q=Surabaya,+Jawa+Timur,+Indonesia',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hubungi Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Kami siap membantu Anda dengan segala pertanyaan tentang SUKUNERGY. 
              Tim customer service kami tersedia 24/7 untuk memberikan pelayanan terbaik.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${method.bgColor} mb-6`}>
                      <method.icon className={`h-8 w-8 ${method.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {method.description}
                    </p>
                    <p className="text-gray-900 font-medium mb-6">
                      {method.value}
                    </p>
                    <Button asChild className="w-full">
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {method.action}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Jam Operasional</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Customer Service (WhatsApp)</span>
                    <span className="text-primary">24/7</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Email Response</span>
                    <span className="text-gray-600">Maks. 24 jam</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium">Pengiriman</span>
                    <span className="text-gray-600">Senin - Sabtu</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Kantor</span>
                    <span className="text-gray-600">Senin - Jumat, 09:00 - 17:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Mungkin jawaban yang Anda cari sudah tersedia di halaman FAQ kami
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="text-left p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Tentang Produk
                </h3>
                <p className="text-gray-600 text-sm">
                  Informasi nutrisi, bahan, cara penyimpanan, dan manfaat SUKUNERGY
                </p>
              </div>
              
              <div className="text-left p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Pemesanan & Pengiriman
                </h3>
                <p className="text-gray-600 text-sm">
                  Cara pesan, metode pembayaran, ongkos kirim, dan tracking pesanan
                </p>
              </div>
            </div>
            
            <Button asChild size="lg" variant="outline">
              <a href="/faq">
                Lihat Semua FAQ
              </a>
            </Button>
          </div>
        </section>

        {/* Quick Contact CTA */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Butuh Bantuan Segera?
            </h2>
            <p className="text-lg text-green-100 mb-8">
              Tim customer service kami siap membantu Anda kapan saja
            </p>
            <Button
              size="xl"
              asChild
              className="bg-white text-primary hover:bg-gray-50"
            >
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent('Halo SUKUNERGY! Saya butuh bantuan segera.')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat WhatsApp Sekarang
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

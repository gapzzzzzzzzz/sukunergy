import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { FAQSection } from '@/components/sections/faq-section';
import { generateSEOMetadata } from '@/lib/utils';

export const metadata: Metadata = generateSEOMetadata({
  title: 'FAQ - Pertanyaan yang Sering Diajukan | SUKUNERGY',
  description: 'Temukan jawaban atas pertanyaan umum tentang SUKUNERGY, manfaat sukun, cara pemesanan, penyimpanan, dan informasi nutrisi protein bar sukun.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        <FAQSection />
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

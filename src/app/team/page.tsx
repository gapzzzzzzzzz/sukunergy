import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { TeamSection } from '@/components/sections/team-section';
import { generateSEOMetadata } from '@/lib/utils';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Tim Kami - SUKUNERGY',
  description: 'Kenali tim hebat di balik SUKUNERGY yang berdedikasi menciptakan produk protein bar sukun terbaik untuk Indonesia.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tim SUKUNERGY
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Bertemu dengan orang-orang luar biasa di balik SUKUNERGY. Tim muda, passionate, dan berdedikasi 
              untuk menghadirkan inovasi produk sehat berbahan lokal Indonesia.
            </p>
          </div>
        </section>

        <TeamSection />

        {/* Company Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nilai-Nilai Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Prinsip yang memandu setiap langkah kami dalam mengembangkan SUKUNERGY
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
                <p className="text-gray-600 text-sm">
                  Mendukung produk lokal dan ramah lingkungan untuk masa depan yang berkelanjutan
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600 text-sm">
                  Berkomitmen pada kualitas terbaik dalam setiap produk yang kami hasilkan
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaboration</h3>
                <p className="text-gray-600 text-sm">
                  Bekerja sama dengan petani lokal dan komunitas untuk kemajuan bersama
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Terus berinovasi untuk menghadirkan solusi nutrisi yang lebih baik
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bergabung dengan Tim Kami
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Kami selalu mencari talenta terbaik yang passionate tentang produk sehat dan inovasi. 
              Mari bersama-sama membangun masa depan nutrisi Indonesia.
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent('Halo! Saya tertarik untuk bergabung dengan tim SUKUNERGY. Bisa tolong berikan informasi tentang kesempatan karir yang tersedia?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Hubungi Kami untuk Karir
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

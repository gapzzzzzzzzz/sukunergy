import { Metadata } from 'next';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductsSection } from '@/components/sections/products-section';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { generateSEOMetadata } from '@/lib/utils';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Produk SUKUNERGY - Bar Protein Sukun Sehat',
  description: 'Jelajahi koleksi lengkap protein bar sukun SUKUNERGY. Original, Chocolate, Mixed Nuts dengan berbagai ukuran kemasan. Tinggi protein, rendah kalori, 100% alami.',
  path: '/products',
});

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Produk SUKUNERGY
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Temukan berbagai varian protein bar sukun yang sesuai dengan kebutuhan dan selera Anda. 
              Semua dibuat dengan bahan alami berkualitas tinggi.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <ProductsSection />
        </Suspense>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Mengapa Memilih SUKUNERGY?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Alami</h3>
                <p className="text-gray-600">
                  Dibuat dari sukun pilihan dan bahan alami tanpa pengawet buatan
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💪</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tinggi Protein</h3>
                <p className="text-gray-600">
                  15g protein per bar untuk mendukung kebutuhan nutrisi harian Anda
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Kualitas Premium</h3>
                <p className="text-gray-600">
                  Tersertifikasi halal dan BPOM dengan standar kualitas internasional
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

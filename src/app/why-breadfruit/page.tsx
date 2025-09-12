import { Metadata } from 'next';
import { Leaf, Heart, Shield, Zap, Award, Users } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateSEOMetadata } from '@/lib/utils';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Mengapa Sukun? Keunggulan Superfood Lokal Indonesia | SUKUNERGY',
  description: 'Sukun adalah superfood lokal Indonesia yang tinggi protein, kaya serat, dan rendah indeks glikemik. Pelajari keunggulan sukun sebagai bahan dasar SUKUNERGY.',
  path: '/why-breadfruit',
});

const nutritionFacts = [
  { label: 'Protein', value: '4.3g', description: 'per 100g sukun' },
  { label: 'Serat', value: '4.9g', description: 'per 100g sukun' },
  { label: 'Vitamin C', value: '29mg', description: '32% kebutuhan harian' },
  { label: 'Kalium', value: '490mg', description: 'baik untuk jantung' },
  { label: 'Indeks Glikemik', value: '68', description: 'lebih rendah dari nasi' },
  { label: 'Kalori', value: '103', description: 'per 100g sukun' },
];

const benefits = [
  {
    icon: Heart,
    title: 'Kesehatan Jantung',
    description: 'Kaya kalium yang membantu mengatur tekanan darah dan menjaga kesehatan kardiovaskular.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Zap,
    title: 'Energi Berkelanjutan',
    description: 'Karbohidrat kompleks memberikan energi stabil tanpa lonjakan gula darah.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Shield,
    title: 'Antioksidan Tinggi',
    description: 'Vitamin C dan flavonoid melindungi sel dari kerusakan radikal bebas.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Leaf,
    title: 'Ramah Lingkungan',
    description: 'Pohon sukun tumbuh cepat, tidak memerlukan pestisida, dan menyerap CO2 tinggi.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
];

export default function WhyBreadfruit() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-green-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Mengapa Sukun?
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Sukun (Artocarpus altilis) adalah superfood lokal Indonesia yang telah menjadi makanan pokok 
                di berbagai negara Pasifik selama berabad-abad. Mari kenali keunggulan nutrisi yang luar biasa ini.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-full h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🌳</div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Pohon Sukun</h3>
                    <p className="text-green-700">Artocarpus altilis</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Superfood Lokal dengan Nutrisi Lengkap
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <strong>Protein Lengkap:</strong> Mengandung semua asam amino esensial yang dibutuhkan tubuh
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <strong>Bebas Gluten:</strong> Aman untuk penderita celiac disease dan intoleransi gluten
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <strong>Indeks Glikemik Rendah:</strong> Tidak menyebabkan lonjakan gula darah yang drastis
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <p className="text-gray-700">
                      <strong>Kaya Mineral:</strong> Kalium, magnesium, dan fosfor untuk kesehatan optimal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nutrition Facts */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Fakta Nutrisi Sukun
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Bandingkan kandungan nutrisi sukun dengan makanan pokok lainnya
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {nutritionFacts.map((fact, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-primary mb-2">
                      {fact.value}
                    </div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {fact.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {fact.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Manfaat Kesehatan Sukun
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Berbagai keunggulan sukun yang mendukung kesehatan dan gaya hidup aktif Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${benefit.bgColor} mb-6`}>
                      <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Environmental Impact */}
        <section className="py-20 bg-green-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dampak Lingkungan Positif
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Memilih sukun berarti mendukung keberlanjutan lingkungan dan ekonomi lokal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Pertumbuhan Cepat
                </h3>
                <p className="text-gray-600">
                  Pohon sukun dapat berbuah dalam 3-4 tahun dan produktif hingga 50 tahun
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Penyerap Karbon
                </h3>
                <p className="text-gray-600">
                  Satu pohon sukun dapat menyerap 28kg CO2 per tahun dari atmosfer
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🌾</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Mendukung Petani
                </h3>
                <p className="text-gray-600">
                  Setiap pembelian SUKUNERGY membantu meningkatkan kesejahteraan petani lokal
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perbandingan dengan Makanan Pokok Lain
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Lihat bagaimana sukun unggul dibandingkan sumber karbohidrat lainnya
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Makanan (100g)</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Kalori</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Protein</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Serat</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Vitamin C</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Indeks Glikemik</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-green-50">
                    <td className="px-6 py-4 font-semibold text-primary">Sukun</td>
                    <td className="px-6 py-4 text-center">103</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">4.3g</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">4.9g</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">29mg</td>
                    <td className="px-6 py-4 text-center font-semibold text-green-600">68</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4">Nasi Putih</td>
                    <td className="px-6 py-4 text-center">130</td>
                    <td className="px-6 py-4 text-center">2.7g</td>
                    <td className="px-6 py-4 text-center">0.4g</td>
                    <td className="px-6 py-4 text-center">0mg</td>
                    <td className="px-6 py-4 text-center">73</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4">Kentang</td>
                    <td className="px-6 py-4 text-center">77</td>
                    <td className="px-6 py-4 text-center">2.0g</td>
                    <td className="px-6 py-4 text-center">2.2g</td>
                    <td className="px-6 py-4 text-center">19.7mg</td>
                    <td className="px-6 py-4 text-center">78</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-6 py-4">Ubi Jalar</td>
                    <td className="px-6 py-4 text-center">86</td>
                    <td className="px-6 py-4 text-center">1.6g</td>
                    <td className="px-6 py-4 text-center">3.0g</td>
                    <td className="px-6 py-4 text-center">2.4mg</td>
                    <td className="px-6 py-4 text-center">70</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Siap Merasakan Manfaat Sukun?
            </h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan revolusi nutrisi Indonesia. Coba SUKUNERGY hari ini dan rasakan 
              perbedaan superfood lokal dalam hidup Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                asChild
                className="bg-white text-primary hover:bg-gray-50"
              >
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent('Halo SUKUNERGY! Saya tertarik dengan manfaat sukun dan ingin mencoba produk Anda.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pesan SUKUNERGY Sekarang
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                asChild
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                <a href="/products">
                  Lihat Semua Produk
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

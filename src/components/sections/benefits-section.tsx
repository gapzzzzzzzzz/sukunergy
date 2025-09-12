import { Heart, Zap, Shield, Leaf, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Heart,
    title: 'Kesehatan Jantung',
    description: 'Sukun kaya kalium yang baik untuk menjaga kesehatan jantung dan mengatur tekanan darah.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Zap,
    title: 'Energi Tahan Lama',
    description: 'Protein tinggi dan karbohidrat kompleks memberikan energi yang stabil sepanjang hari.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Shield,
    title: 'Sistem Imun Kuat',
    description: 'Vitamin C dan antioksidan alami membantu memperkuat sistem kekebalan tubuh.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Leaf,
    title: 'Ramah Lingkungan',
    description: 'Sukun adalah tanaman berkelanjutan yang mendukung pelestarian lingkungan.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Award,
    title: 'Kualitas Premium',
    description: 'Diproduksi dengan standar tinggi dan telah tersertifikasi halal serta BPOM.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Users,
    title: 'Mendukung Petani Lokal',
    description: 'Setiap pembelian membantu meningkatkan kesejahteraan petani sukun Indonesia.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mengapa Memilih SUKUNERGY?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lebih dari sekadar camilan, SUKUNERGY adalah investasi untuk kesehatan dan masa depan yang lebih baik
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm"
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${benefit.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
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

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-green-100/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Siap Merasakan Manfaatnya?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan orang yang telah merasakan manfaat SUKUNERGY untuk hidup yang lebih sehat dan berenergi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent('Halo! Saya tertarik dengan manfaat SUKUNERGY. Bisa tolong dijelaskan lebih detail?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Konsultasi Gratis via WhatsApp
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Lihat Semua Produk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Mock testimonials data
const testimonials = [
  {
    id: '1',
    name: 'Sarah Putri',
    location: 'Jakarta',
    content: 'SUKUNERGY jadi camilan favorit aku! Rasanya enak, mengenyangkan, dan yang paling penting sehat. Cocok banget buat yang lagi program diet seperti aku.',
    rating: 5,
    image: '/images/testimonials/sarah.jpg',
  },
  {
    id: '2',
    name: 'Budi Santoso',
    location: 'Surabaya',
    content: 'Sebagai atlet, aku butuh asupan protein tinggi. SUKUNERGY memberikan energi yang cukup untuk latihan tanpa bikin perut kembung. Recommended!',
    rating: 5,
    image: '/images/testimonials/budi.jpg',
  },
  {
    id: '3',
    name: 'Maya Sari',
    location: 'Bandung',
    content: 'Anak-anak suka banget sama rasa cokelat SUKUNERGY. Akhirnya ada camilan sehat yang disukai anak dan approved sama mamanya. Thank you SUKUNERGY!',
    rating: 5,
    image: '/images/testimonials/maya.jpg',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kata Mereka Tentang SUKUNERGY
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Testimoni nyata dari pelanggan yang telah merasakan manfaat SUKUNERGY dalam kehidupan sehari-hari
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/20">
                  <Quote className="h-8 w-8" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Ingin berbagi pengalaman Anda dengan SUKUNERGY?
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent('Halo! Saya ingin berbagi testimoni tentang SUKUNERGY.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Kirim Testimoni Anda
          </a>
        </div>
      </div>
    </section>
  );
}

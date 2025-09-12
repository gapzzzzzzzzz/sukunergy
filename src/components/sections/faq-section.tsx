'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock FAQ data
const faqs = [
  {
    id: '1',
    question: 'Apa itu SUKUNERGY dan mengapa berbahan dasar sukun?',
    answer: 'SUKUNERGY adalah bar protein berbahan dasar sukun (breadfruit) yang kaya nutrisi. Sukun dipilih karena merupakan superfood lokal Indonesia yang tinggi protein, serat, dan rendah indeks glikemik. Sukun juga bebas gluten alami dan memiliki rasa yang lezat.',
    category: 'Produk',
  },
  {
    id: '2',
    question: 'Berapa kalori dalam satu bar SUKUNERGY?',
    answer: 'Satu bar SUKUNERGY (45g) mengandung sekitar 130-145 kalori, tergantung varian. Ini sangat ideal sebagai camilan sehat yang mengenyangkan tanpa berlebihan kalori.',
    category: 'Nutrisi',
  },
  {
    id: '3',
    question: 'Bagaimana cara penyimpanan yang benar?',
    answer: 'Simpan SUKUNERGY di tempat kering dan sejuk, hindari paparan sinar matahari langsung. Setelah dibuka, konsumsi dalam 2-3 hari untuk kualitas terbaik. Produk dapat bertahan hingga 6 bulan jika disimpan dengan benar.',
    category: 'Penyimpanan',
  },
  {
    id: '4',
    question: 'Apakah SUKUNERGY aman untuk penderita diabetes?',
    answer: 'SUKUNERGY memiliki indeks glikemik rendah dan gula alami dari madu. Namun, kami sarankan konsultasi dengan dokter atau ahli gizi sebelum mengonsumsi jika Anda memiliki kondisi kesehatan khusus seperti diabetes.',
    category: 'Kesehatan',
  },
  {
    id: '5',
    question: 'Bagaimana cara pemesanan dan pembayaran?',
    answer: 'Anda dapat memesan melalui website ini dengan klik "Order via WhatsApp", atau langsung melalui marketplace seperti Shopee dan TikTok Shop. Pembayaran dapat dilakukan via transfer bank, e-wallet, atau COD (untuk area tertentu).',
    category: 'Pemesanan',
  },
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>(['1']); // First item open by default

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban atas pertanyaan umum tentang SUKUNERGY, manfaat sukun, dan cara pemesanan
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {faq.question}
                      </h3>
                      <div className="text-sm text-primary font-medium">
                        {faq.category}
                      </div>
                    </div>
                    <div className="ml-4">
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </button>

                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openItems.includes(faq.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-6 pb-6">
                    <div className="pt-2 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Masih Ada Pertanyaan?
            </h3>
            <p className="text-gray-600 mb-6">
              Tim customer service kami siap membantu Anda 24/7 melalui WhatsApp
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${encodeURIComponent('Halo! Saya memiliki pertanyaan tentang SUKUNERGY yang belum terjawab di FAQ.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Hubungi Customer Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

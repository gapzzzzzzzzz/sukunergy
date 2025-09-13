'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

// Mock data - in real app this would come from database
const featuredProducts = [
  {
    id: '1',
    name: 'SUKUNERGY Original',
    slug: 'sukunergy-original',
    description: 'Bar sukun original dengan rasa alami yang kaya protein dan rendah kalori.',
    image: '/images/products/original.jpg',
    variants: [
      { name: 'Single Pack', price: 15000, originalPrice: 18000 },
      { name: 'Pack 3', price: 40000, originalPrice: 45000 },
      { name: 'Pack 6', price: 75000, originalPrice: 90000 },
    ],
    badges: ['Bestseller', 'Original'],
  },
  {
    id: '2',
    name: 'SUKUNERGY Chocolate',
    slug: 'sukunergy-chocolate',
    description: 'Bar sukun dengan perpaduan cokelat premium yang lezat.',
    image: '/images/products/chocolate.jpg',
    variants: [
      { name: 'Single Pack', price: 16000, originalPrice: 19000 },
      { name: 'Pack 3', price: 42000, originalPrice: 48000 },
      { name: 'Pack 6', price: 78000, originalPrice: 95000 },
    ],
    badges: ['Popular', 'Premium'],
  },
  {
    id: '3',
    name: 'SUKUNERGY Mixed Nuts',
    slug: 'sukunergy-mixed-nuts',
    description: 'Kombinasi sukun dengan campuran kacang-kacangan premium.',
    image: '/images/products/mixed-nuts.jpg',
    variants: [
      { name: 'Single Pack', price: 17000, originalPrice: 20000 },
      { name: 'Pack 3', price: 45000, originalPrice: 51000 },
      { name: 'Pack 6', price: 82000, originalPrice: 100000 },
    ],
    badges: ['Crunchy', 'High Protein'],
  },
];

export function ProductsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Produk Unggulan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilihan terbaik protein bar sukun dengan berbagai varian rasa untuk memenuhi kebutuhan gizi harian Anda
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {product.name.split(' ')[1]?.[0] || 'S'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {product.name}
                    </div>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {product.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant={badge === 'Bestseller' ? 'bestseller' : badge === 'Popular' ? 'featured' : 'secondary'}
                      className="text-xs"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Price Range */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(product.variants[0].price)}
                    </span>
                    {product.variants[0].originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.variants[0].originalPrice)}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">/ pack</span>
                  </div>
                  {product.variants.length > 1 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Mulai dari {formatPrice(product.variants[product.variants.length - 1].price)} untuk paket besar
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                  <div>
                    <div className="font-semibold text-primary">130</div>
                    <div>Kalori</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">15g</div>
                    <div>Protein</div>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">4g</div>
                    <div>Serat</div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 sm:p-6 pt-0 space-y-2">
                <Button asChild className="w-full text-sm sm:text-base">
                  <Link href={`/products/${product.slug}`}>
                    <span className="hidden sm:inline">Lihat Detail & Pesan</span>
                    <span className="sm:hidden">Lihat Detail</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-sm sm:text-base"
                  onClick={() => {
                    const message = encodeURIComponent(
                      `Halo! Saya tertarik dengan ${product.name}. Bisa tolong dijelaskan lebih detail tentang produk ini?`
                    );
                    window.open(
                      `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${message}`,
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                >
                  <span className="hidden sm:inline">Tanya via WhatsApp</span>
                  <span className="sm:hidden">Tanya WA</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Products CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/products">
              Lihat Semua Produk
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

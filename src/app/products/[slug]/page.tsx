'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, Shield, Truck, Award } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils';

// Mock product data - in real app this would come from database
const products = [
  {
    id: '1',
    name: 'SUKUNERGY Original',
    slug: 'sukunergy-original',
    description: 'Bar protein sukun original dengan rasa alami yang kaya protein dan rendah kalori. Dibuat dari sukun pilihan dengan proses yang higienis.',
    longDescription: 'SUKUNERGY Original adalah bar protein sukun pertama di Indonesia yang menggabungkan cita rasa autentik sukun dengan nutrisi lengkap. Setiap batang mengandung 15g protein berkualitas tinggi, 4g serat, dan hanya 130 kalori. Cocok untuk sarapan sehat, camilan pre/post workout, atau sebagai pengganti makanan ringan tidak sehat.',
    images: [
      '/images/products/original-1.jpg',
      '/images/products/original-2.jpg',
      '/images/products/original-3.jpg',
    ],
    variants: [
      { id: '1-1', name: 'Single Pack', price: 15000, originalPrice: 18000, stock: 50 },
      { id: '1-2', name: 'Pack 3', price: 40000, originalPrice: 45000, stock: 30 },
      { id: '1-3', name: 'Pack 6', price: 75000, originalPrice: 90000, stock: 20 },
    ],
    badges: ['Bestseller', 'Original'],
    rating: 4.8,
    reviewCount: 324,
    nutrition: {
      calories: 130,
      protein: 15,
      carbs: 18,
      fat: 3,
      fiber: 4,
      sugar: 8,
    },
    ingredients: ['Sukun', 'Protein Whey', 'Madu', 'Kacang Almond', 'Ekstrak Vanilla', 'Garam Himalaya'],
    allergens: ['Kacang-kacangan', 'Susu'],
    storageInstructions: 'Simpan di tempat kering dan sejuk. Hindari sinar matahari langsung. Konsumsi dalam 2 minggu setelah kemasan dibuka.',
    benefits: [
      'Tinggi protein untuk pembentukan otot',
      'Rendah kalori untuk kontrol berat badan',
      'Bebas gluten dan pengawet buatan',
      'Sumber energi tahan lama',
      'Mendukung gaya hidup aktif',
    ],
  },
  {
    id: '2',
    name: 'SUKUNERGY Chocolate',
    slug: 'sukunergy-chocolate',
    description: 'Perpaduan sempurna antara sukun dan cokelat premium untuk pengalaman rasa yang tak terlupakan.',
    longDescription: 'SUKUNERGY Chocolate menghadirkan kelezatan cokelat premium yang dipadukan dengan nutrisi sukun. Menggunakan cokelat berkualitas tinggi dan proses yang sempurna, menciptakan rasa yang rich namun tetap sehat. Ideal untuk pecinta cokelat yang ingin tetap menjaga kesehatan.',
    images: [
      '/images/products/chocolate-1.jpg',
      '/images/products/chocolate-2.jpg',
      '/images/products/chocolate-3.jpg',
    ],
    variants: [
      { id: '2-1', name: 'Single Pack', price: 16000, originalPrice: 19000, stock: 45 },
      { id: '2-2', name: 'Pack 3', price: 42000, originalPrice: 48000, stock: 25 },
      { id: '2-3', name: 'Pack 6', price: 78000, originalPrice: 96000, stock: 15 },
    ],
    badges: ['New', 'Premium'],
    rating: 4.9,
    reviewCount: 256,
    nutrition: {
      calories: 135,
      protein: 15,
      carbs: 19,
      fat: 4,
      fiber: 4,
      sugar: 9,
    },
    ingredients: ['Sukun', 'Protein Whey', 'Cokelat Premium', 'Madu', 'Kacang Almond', 'Ekstrak Vanilla'],
    allergens: ['Kacang-kacangan', 'Susu'],
    storageInstructions: 'Simpan di tempat kering dan sejuk. Hindari sinar matahari langsung. Konsumsi dalam 2 minggu setelah kemasan dibuka.',
    benefits: [
      'Rasa cokelat premium yang autentik',
      'Antioksidan dari cokelat berkualitas',
      'Energi instan dan tahan lama',
      'Mood booster alami',
      'Cocok untuk segala usia',
    ],
  },
  {
    id: '3',
    name: 'SUKUNERGY Mixed Nuts',
    slug: 'sukunergy-mixed-nuts',
    description: 'Kombinasi sukun dengan berbagai kacang pilihan untuk tekstur renyah dan nutrisi maksimal.',
    longDescription: 'SUKUNERGY Mixed Nuts adalah varian premium yang menggabungkan sukun dengan berbagai kacang pilihan seperti almond, walnut, dan cashew. Memberikan tekstur renyah yang unik dan nutrisi lengkap dengan lemak sehat, protein, dan mineral penting.',
    images: [
      '/images/products/mixednuts-1.jpg',
      '/images/products/mixednuts-2.jpg',
      '/images/products/mixednuts-3.jpg',
    ],
    variants: [
      { id: '3-1', name: 'Single Pack', price: 18000, originalPrice: 22000, stock: 35 },
      { id: '3-2', name: 'Pack 3', price: 48000, originalPrice: 55000, stock: 20 },
      { id: '3-3', name: 'Pack 6', price: 90000, originalPrice: 110000, stock: 12 },
    ],
    badges: ['Premium', 'High Protein'],
    rating: 4.7,
    reviewCount: 189,
    nutrition: {
      calories: 145,
      protein: 17,
      carbs: 16,
      fat: 6,
      fiber: 5,
      sugar: 7,
    },
    ingredients: ['Sukun', 'Protein Whey', 'Almond', 'Walnut', 'Cashew', 'Madu', 'Garam Himalaya'],
    allergens: ['Kacang-kacangan', 'Susu'],
    storageInstructions: 'Simpan di tempat kering dan sejuk. Hindari sinar matahari langsung. Konsumsi dalam 2 minggu setelah kemasan dibuka.',
    benefits: [
      'Protein tertinggi dalam koleksi kami',
      'Lemak sehat dari kacang-kacangan',
      'Tekstur renyah yang memuaskan',
      'Kaya vitamin E dan mineral',
      'Cocok untuk diet keto dan paleo',
    ],
  },
];

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find(p => p.slug === params.slug);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    notFound();
  }

  const currentVariant = product.variants[selectedVariant];

  const handleAddToCart = () => {
    addToCart({
      id: currentVariant.id,
      name: product.name,
      variant: currentVariant.name,
      price: currentVariant.price,
      image: product.images[0],
      quantity,
    });

    toast({
      title: "Produk ditambahkan ke keranjang!",
      description: `${quantity}x ${product.name} (${currentVariant.name}) berhasil ditambahkan.`,
    });
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Halo! Saya ingin memesan ${product.name} (${currentVariant.name}) sebanyak ${quantity} pcs. Total: ${formatPrice(currentVariant.price * quantity)}. Bisa tolong dibantu prosesnya?`
    );
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-primary">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/products" className="text-gray-500 hover:text-primary">
                Produk
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {product.badges.map((badge) => (
                      <Badge key={badge} variant="featured">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviewCount} ulasan)
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {product.longDescription}
                  </p>
                </div>

                {/* Variant Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Pilih Varian
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(index)}
                        className={`p-4 border-2 rounded-lg text-left transition-colors ${
                          selectedVariant === index
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {variant.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Stok: {variant.stock} pcs
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {formatPrice(variant.price)}
                            </div>
                            {variant.originalPrice > variant.price && (
                              <div className="text-sm text-gray-400 line-through">
                                {formatPrice(variant.originalPrice)}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Jumlah
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 rounded-l-lg"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(currentVariant.stock, quantity + 1))}
                        className="p-2 hover:bg-gray-50 rounded-r-lg"
                        disabled={quantity >= currentVariant.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Max: {currentVariant.stock} pcs
                    </span>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">
                      Total Harga:
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(currentVariant.price * quantity)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full"
                    size="lg"
                    disabled={currentVariant.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Tambah ke Keranjang
                  </Button>
                  
                  <Button
                    onClick={handleWhatsAppOrder}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Pesan Langsung via WhatsApp
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-primary mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Halal & BPOM</span>
                  </div>
                  <div className="text-center">
                    <Truck className="h-6 w-6 text-primary mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Gratis Ongkir</span>
                  </div>
                  <div className="text-center">
                    <Award className="h-6 w-6 text-primary mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Kualitas Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Nutrition Facts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Informasi Nutrisi
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Kalori</span>
                      <span className="font-medium">{product.nutrition.calories} kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span className="font-medium">{product.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Karbohidrat</span>
                      <span className="font-medium">{product.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lemak</span>
                      <span className="font-medium">{product.nutrition.fat}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Serat</span>
                      <span className="font-medium">{product.nutrition.fiber}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gula</span>
                      <span className="font-medium">{product.nutrition.sugar}g</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ingredients */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Komposisi
                  </h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-2">Alergen:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.allergens.map((allergen) => (
                        <Badge key={allergen} variant="secondary">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits & Storage */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Manfaat
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Cara Penyimpanan:</h4>
                    <p className="text-sm text-gray-600">
                      {product.storageInstructions}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Produk Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedProduct.images[0]}
                          alt={relatedProduct.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {relatedProduct.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(relatedProduct.variants[0].price)}
                          </span>
                          {relatedProduct.variants[0].originalPrice > relatedProduct.variants[0].price && (
                            <span className="text-lg text-gray-400 line-through">
                              {formatPrice(relatedProduct.variants[0].originalPrice)}
                            </span>
                          )}
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/products/${relatedProduct.slug}`}>
                            Lihat Detail
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

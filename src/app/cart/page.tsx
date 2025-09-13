'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { formatPrice, generateWhatsAppMessage, createWhatsAppUrl } from '@/lib/utils';

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    // Prepare order data for WhatsApp message
    const orderData = {
      items: items.map(item => ({
        name: item.productName,
        variant: item.variantName,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total,
      customer: {
        name: 'Pelanggan Website', // In real app, this would come from a form
        phone: 'Akan diisi saat checkout',
        address: 'Akan diisi saat checkout',
        notes: 'Pesanan dari website',
      },
    };

    const message = generateWhatsAppMessage(orderData);
    const whatsappUrl = createWhatsAppUrl(process.env.NEXT_PUBLIC_WA_NUMBER || '', message);

    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'checkout_initiated', {
        event_category: 'ecommerce',
        event_label: 'whatsapp_checkout',
        value: total,
        items: items.length,
      });
    }

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    setIsCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Keranjang Anda Kosong
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Belum ada produk di keranjang. Mari mulai berbelanja produk sehat SUKUNERGY!
              </p>
              <Button asChild size="lg">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Mulai Berbelanja
                </Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Lanjut Belanja
              </Link>
            </Button>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Keranjang Belanja ({itemCount} item)
              </h1>
              
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Kosongkan Keranjang
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4 sm:p-6">
                      {/* Mobile Layout */}
                      <div className="block sm:hidden">
                        <div className="flex items-start space-x-3 mb-4">
                          {/* Product Image Placeholder */}
                          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold text-sm">
                              {item.productName.split(' ')[1]?.[0] || 'S'}
                            </span>
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                              {item.productName}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1">
                              Varian: {item.variantName}
                            </p>
                            {item.weight && (
                              <p className="text-xs text-gray-500">
                                Berat: {item.weight}g
                              </p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Mobile Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-primary">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatPrice(item.price)} / item
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="text-base font-semibold min-w-[1.5rem] text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxStock}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:flex items-center space-x-4">
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-lg">
                            {item.productName.split(' ')[1]?.[0] || 'S'}
                          </span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.productName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-1">
                            Varian: {item.variantName}
                          </p>
                          {item.weight && (
                            <p className="text-sm text-gray-500">
                              Berat: {item.weight}g
                            </p>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <span className="text-lg font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatPrice(item.price)} / item
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 lg:top-24">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} item)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Gratis Ongkir</span>
                    <span>Rp 0</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full"
                    size="lg"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Memproses...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Checkout via WhatsApp
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan
                  </p>

                  {/* Trust Badges */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Gratis konsultasi produk
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Garansi uang kembali
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      Pengiriman ke seluruh Indonesia
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

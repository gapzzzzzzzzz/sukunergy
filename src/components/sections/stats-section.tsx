import { Users, ShoppingBag, Star, Award } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Pelanggan Puas',
    description: 'Telah mempercayai SUKUNERGY',
  },
  {
    icon: ShoppingBag,
    value: '50,000+',
    label: 'Produk Terjual',
    description: 'Bar protein sukun berkualitas',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Rating Pelanggan',
    description: 'Berdasarkan 2,500+ ulasan',
  },
  {
    icon: Award,
    value: '100%',
    label: 'Bahan Alami',
    description: 'Tanpa pengawet buatan',
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dipercaya oleh Ribuan Pelanggan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SUKUNERGY telah menjadi pilihan utama untuk camilan sehat dan bergizi di seluruh Indonesia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Mock team data
const teamMembers = [
  {
    id: '1',
    name: 'Galih Aji Pangestu',
    programStudi: 'Informatika – UPN "Veteran" Jawa Timur',
    instagramUrl: 'https://instagram.com/galiihajiip',
    photo: '/images/team/galih.jpg',
    bio: 'Full-stack developer dan product manager SUKUNERGY.',
  },
  {
    id: '2',
    name: 'Stefani Putri',
    programStudi: 'Sistem Informasi',
    instagramUrl: 'https://instagram.com/stefani.placeholder',
    photo: '/images/team/stefani.jpg',
    bio: 'UI/UX Designer dan marketing specialist.',
  },
  {
    id: '3',
    name: 'Raka Pradipta',
    programStudi: 'Teknik Komputer',
    instagramUrl: 'https://instagram.com/raka.placeholder',
    photo: '/images/team/raka.jpg',
    bio: 'Backend developer dan data analyst.',
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tim Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kenali orang-orang hebat di balik SUKUNERGY yang berdedikasi menciptakan produk terbaik untuk Anda
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member) => (
            <Card key={member.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                {/* Photo */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  <span className="text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Info */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {member.programStudi}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {member.bio}
                </p>

                {/* Instagram Link */}
                {member.instagramUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="group-hover:border-primary group-hover:text-primary transition-colors"
                  >
                    <Link
                      href={member.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2"
                    >
                      <Instagram className="h-4 w-4" />
                      <span>Follow</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Full Team CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/team">
              Lihat Tim Lengkap
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

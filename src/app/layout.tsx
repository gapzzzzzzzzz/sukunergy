import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | SUKUNERGY',
    default: 'SUKUNERGY - Smart fuel for your day',
  },
  description: 'Bar protein sukun sehat, rendah kalori, tinggi protein. Camilan sehat berbahan lokal Indonesia untuk gaya hidup aktif Anda.',
  keywords: ['sukun', 'protein bar', 'sehat', 'rendah kalori', 'tinggi protein', 'camilan sehat', 'Indonesia', 'breadfruit'],
  authors: [{ name: 'SUKUNERGY Team' }],
  creator: 'SUKUNERGY',
  publisher: 'SUKUNERGY',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    title: 'SUKUNERGY - Smart fuel for your day',
    description: 'Bar protein sukun sehat, rendah kalori, tinggi protein. Camilan sehat berbahan lokal Indonesia untuk gaya hidup aktif Anda.',
    siteName: 'SUKUNERGY',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SUKUNERGY - Bar Protein Sukun Sehat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUKUNERGY - Smart fuel for your day',
    description: 'Bar protein sukun sehat, rendah kalori, tinggi protein. Camilan sehat berbahan lokal Indonesia untuk gaya hidup aktif Anda.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

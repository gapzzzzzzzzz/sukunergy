import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const robots = `User-agent: *
Allow: /

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /checkout/

# Allow important pages
Allow: /
Allow: /products
Allow: /team
Allow: /faq
Allow: /contact

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (be nice to our server)
Crawl-delay: 1`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

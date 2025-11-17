export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
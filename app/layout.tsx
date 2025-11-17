import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { ThemeProvider } from '@/lib/theme-context'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Digital Services Showcase - Web Development, Mobile Apps & Digital Marketing',
  description: 'Professional digital services for modern businesses. Expert web development, mobile app development, and digital marketing solutions. Transform your digital presence today.',
  keywords: [
    'digital services',
    'web development',
    'mobile app development',
    'digital marketing',
    'SEO services',
    'professional web design',
    'custom software development',
    'business solutions',
    'ecommerce development',
    'React development',
    'Next.js development',
  ],
  canonical: '/',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💼</text></svg>" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://imgix.cosmicjs.com" />
        <link rel="dns-prefetch" href="https://imgix.cosmicjs.com" />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body>
        <ThemeProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </ThemeProvider>
      </body>
    </html>
  )
}
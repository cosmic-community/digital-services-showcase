import { Service, CaseStudy, Testimonial } from '@/types'

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export function generateMetadata(data: SEOMetadata) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'
  
  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.title,
      description: data.description,
      url: data.canonical ? `${baseUrl}${data.canonical}` : baseUrl,
      siteName: 'Digital Services Showcase',
      images: data.ogImage ? [
        {
          url: `${data.ogImage}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: data.title,
        }
      ] : [],
      locale: 'en_US',
      type: data.ogType || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.ogImage ? [`${data.ogImage}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
      creator: '@digitalservices',
      site: '@digitalservices',
    },
    alternates: {
      canonical: data.canonical ? `${baseUrl}${data.canonical}` : baseUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  }
}

export function generateServiceSchema(service: Service) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.metadata.service_name,
    description: service.metadata.short_description,
    provider: {
      '@type': 'Organization',
      name: 'Digital Services Showcase',
      url: baseUrl,
    },
    offers: service.metadata.starting_price ? {
      '@type': 'Offer',
      price: service.metadata.starting_price.replace(/[^0-9.,]/g, ''),
      priceCurrency: 'USD',
    } : undefined,
    url: `${baseUrl}/services/${service.slug}`,
    serviceType: service.metadata.service_name,
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  }
}

export function generateCaseStudySchema(caseStudy: CaseStudy) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.metadata.project_name,
    description: caseStudy.metadata.project_summary,
    image: caseStudy.metadata.featured_image ? 
      `${caseStudy.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress` : undefined,
    datePublished: caseStudy.created_at || new Date().toISOString(),
    dateModified: caseStudy.modified_at || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Digital Services Showcase',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Services Showcase',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/case-studies/${caseStudy.slug}`,
    },
  }
}

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digital Services Showcase',
    url: baseUrl,
    description: 'Professional digital services for modern businesses - Web development, mobile apps, and digital marketing solutions',
    logo: `${baseUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
      email: 'tony@cosmicjs.com',
    },
    sameAs: [
      'https://twitter.com/digitalservices',
      'https://linkedin.com/company/digitalservices',
      'https://github.com/digitalservices',
    ],
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

export function generateLocalBusinessSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Digital Services Showcase',
    image: `${baseUrl}/logo.png`,
    '@id': baseUrl,
    url: baseUrl,
    telephone: '+1-555-123-4567',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Digital Ave',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94102',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://twitter.com/digitalservices',
      'https://linkedin.com/company/digitalservices',
    ],
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateAggregateRatingSchema(testimonials: Testimonial[]) {
  const ratings = testimonials
    .filter(t => t.metadata.rating?.key)
    .map(t => parseInt(t.metadata.rating!.key))
  
  if (ratings.length === 0) return null
  
  const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digital Services Showcase',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: testimonials.length,
      bestRating: '5',
      worstRating: '1',
    },
    url: baseUrl,
  }
}

export function generateReviewSchema(testimonial: Testimonial) {
  if (!testimonial.metadata.rating?.key) return null
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.metadata.rating.key,
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: testimonial.metadata.client_name,
    },
    reviewBody: testimonial.metadata.testimonial_quote,
    itemReviewed: {
      '@type': 'Organization',
      name: 'Digital Services Showcase',
    },
  }
}

export function generateVideoSchema(video: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
  }
}
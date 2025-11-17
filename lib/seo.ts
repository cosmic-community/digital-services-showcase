import { Service, CaseStudy } from '@/types'

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
    },
    alternates: {
      canonical: data.canonical ? `${baseUrl}${data.canonical}` : baseUrl,
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
    datePublished: caseStudy.created_at,
    dateModified: caseStudy.modified_at,
    author: {
      '@type': 'Organization',
      name: 'Digital Services Showcase',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Services Showcase',
      url: baseUrl,
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
    description: 'Professional digital services for modern businesses',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
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
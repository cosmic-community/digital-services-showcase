import { getServices, getCaseStudies } from '@/lib/cosmic'
import { Service, CaseStudy } from '@/types'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digital-services-showcase.vercel.app'

  // Fetch dynamic content
  const [services, caseStudies] = await Promise.all([
    getServices(),
    getCaseStudies()
  ])

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Helper function to safely create Date from timestamp
  const safeDate = (timestamp: string | undefined): Date => {
    if (!timestamp) return new Date()
    const date = new Date(timestamp)
    return isNaN(date.getTime()) ? new Date() : date
  }

  // Service pages
  const servicePages = services.map((service: Service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: safeDate(service.modified_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Case study pages
  const caseStudyPages = caseStudies.map((caseStudy: CaseStudy) => ({
    url: `${baseUrl}/case-studies/${caseStudy.slug}`,
    lastModified: safeDate(caseStudy.modified_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages, ...caseStudyPages]
}
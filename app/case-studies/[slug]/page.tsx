// app/case-studies/[slug]/page.tsx
import { getCaseStudy, getCaseStudies } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { generateMetadata as generateSEOMetadata, generateCaseStudySchema, generateBreadcrumbSchema } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies()
  return caseStudies.map((caseStudy: CaseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug) as CaseStudy | null

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return generateSEOMetadata({
    title: `${caseStudy.metadata.project_name} - Case Study`,
    description: caseStudy.metadata.project_summary,
    keywords: [
      caseStudy.metadata.project_name,
      caseStudy.metadata.client_name,
      'case study',
      ...(caseStudy.metadata.technologies_used || []),
    ],
    canonical: `/case-studies/${caseStudy.slug}`,
    ogImage: caseStudy.metadata.featured_image?.imgix_url,
    ogType: 'article',
    publishedTime: caseStudy.created_at,
    modifiedTime: caseStudy.modified_at,
  })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const caseStudy = await getCaseStudy(slug) as CaseStudy | null

  if (!caseStudy) {
    notFound()
  }

  const caseStudySchema = generateCaseStudySchema(caseStudy)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
    { name: caseStudy.metadata.project_name, url: `/case-studies/${caseStudy.slug}` },
  ])

  return (
    <div className="py-20">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/case-studies"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Case Studies
        </Link>

        {caseStudy.metadata.featured_image && (
          <div className="relative h-96 rounded-xl overflow-hidden mb-12">
            <img
              src={`${caseStudy.metadata.featured_image.imgix_url}?w=1400&h=768&fit=crop&auto=format,compress`}
              alt={caseStudy.metadata.project_name}
              className="w-full h-full object-cover"
              width="700"
              height="384"
            />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-4">
            {caseStudy.metadata.project_name}
          </h1>

          <div className="flex flex-wrap gap-4 mb-8 text-gray-600">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {caseStudy.metadata.client_name}
            </div>
            
            {caseStudy.metadata.project_duration && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {caseStudy.metadata.project_duration}
              </div>
            )}
          </div>

          <p className="text-xl text-gray-700 mb-12">
            {caseStudy.metadata.project_summary}
          </p>

          {caseStudy.metadata.challenge && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.challenge }}
              />
            </div>
          )}

          {caseStudy.metadata.solution && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.solution }}
              />
            </div>
          )}

          {caseStudy.metadata.results && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Results</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: caseStudy.metadata.results }}
              />
            </div>
          )}

          {caseStudy.metadata.technologies_used && caseStudy.metadata.technologies_used.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.metadata.technologies_used.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {caseStudy.metadata.project_gallery && caseStudy.metadata.project_gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseStudy.metadata.project_gallery.map((image, index: number) => (
                  <img
                    key={index}
                    src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={`${caseStudy.metadata.project_name} - Gallery ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                    width="400"
                    height="300"
                  />
                ))}
              </div>
            </div>
          )}

          {caseStudy.metadata.related_services && caseStudy.metadata.related_services.length > 0 && (
            <div className="pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Related Services</h2>
              <div className="flex flex-wrap gap-4">
                {caseStudy.metadata.related_services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="bg-blue-50 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                  >
                    {service.metadata.service_name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
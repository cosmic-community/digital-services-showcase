import { getCaseStudies } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import Link from 'next/link'

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Case Studies</h1>
          <p className="text-xl text-gray-600">
            Explore our successful projects and the results we've achieved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy: CaseStudy) => (
            <Link
              key={caseStudy.id}
              href={`/case-studies/${caseStudy.slug}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {caseStudy.metadata.featured_image && (
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={`${caseStudy.metadata.featured_image.imgix_url}?w=800&h=512&fit=crop&auto=format,compress`}
                    alt={caseStudy.metadata.project_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width="400"
                    height="256"
                  />
                </div>
              )}

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-2">
                  {caseStudy.metadata.project_name}
                </h2>

                <p className="text-gray-600 mb-4">
                  Client: {caseStudy.metadata.client_name}
                </p>

                <p className="text-gray-700 mb-6">
                  {caseStudy.metadata.project_summary}
                </p>

                {caseStudy.metadata.project_duration && (
                  <p className="text-sm text-gray-600 mb-4">
                    Duration: {caseStudy.metadata.project_duration}
                  </p>
                )}

                {caseStudy.metadata.technologies_used && caseStudy.metadata.technologies_used.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.metadata.technologies_used.slice(0, 4).map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-blue-600 font-semibold">
                  Read Full Case Study →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
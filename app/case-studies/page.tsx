import { getCaseStudies } from '@/lib/cosmic'
import { CaseStudy } from '@/types'
import Link from 'next/link'

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Case Studies</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Explore our successful projects and the results we've achieved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((caseStudy: CaseStudy) => (
            <Link
              key={caseStudy.id}
              href={`/case-studies/${caseStudy.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
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
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                  {caseStudy.metadata.project_name}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Client: {caseStudy.metadata.client_name}
                </p>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {caseStudy.metadata.project_summary}
                </p>

                {caseStudy.metadata.project_duration && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Duration: {caseStudy.metadata.project_duration}
                  </p>
                )}

                {caseStudy.metadata.technologies_used && caseStudy.metadata.technologies_used.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.metadata.technologies_used.slice(0, 4).map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-blue-600 dark:text-blue-400 font-semibold">
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
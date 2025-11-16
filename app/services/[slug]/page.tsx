// app/services/[slug]/page.tsx
import { getService, getServices } from '@/lib/cosmic'
import { Service } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service: Service) => ({
    slug: service.slug,
  }))
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug) as Service | null

  if (!service) {
    notFound()
  }

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {service.metadata.icon && (
            <img
              src={`${service.metadata.icon.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={service.metadata.service_name}
              className="w-32 h-32 object-cover rounded-lg mb-8"
              width="128"
              height="128"
            />
          )}

          <h1 className="text-4xl font-bold mb-4">
            {service.metadata.service_name}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {service.metadata.short_description}
          </p>

          {service.metadata.starting_price && (
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
              <p className="text-lg">
                <span className="font-semibold">Starting Price:</span>{' '}
                <span className="text-blue-600 font-bold">
                  {service.metadata.starting_price}
                </span>
              </p>
            </div>
          )}

          {service.metadata.full_description && (
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: service.metadata.full_description }}
            />
          )}

          {service.metadata.features && service.metadata.features.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.metadata.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Contact us to discuss how we can help with your {service.metadata.service_name.toLowerCase()} needs.
            </p>
            <Link
              href="/services"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
import { getServices } from '@/lib/cosmic'
import { Service } from '@/types'
import Link from 'next/link'

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comprehensive digital solutions to help your business succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: Service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
            >
              {service.metadata.icon && (
                <img
                  src={`${service.metadata.icon.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={service.metadata.service_name}
                  className="w-20 h-20 object-cover rounded-lg mb-6"
                  width="80"
                  height="80"
                />
              )}
              
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {service.metadata.service_name}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {service.metadata.short_description}
              </p>
              
              {service.metadata.features && service.metadata.features.length > 0 && (
                <ul className="space-y-2 mb-6">
                  {service.metadata.features.slice(0, 3).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              
              {service.metadata.starting_price && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">
                    Starting at {service.metadata.starting_price}
                  </p>
                </div>
              )}
              
              <p className="text-blue-600 dark:text-blue-400 font-semibold mt-4">
                Learn More →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
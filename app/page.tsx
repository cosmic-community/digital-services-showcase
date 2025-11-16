import { getServices, getTestimonials, getCaseStudies, getTeamMembers } from '@/lib/cosmic'
import { Service, Testimonial, CaseStudy, TeamMember } from '@/types'
import Link from 'next/link'

export default async function HomePage() {
  const [services, testimonials, caseStudies, teamMembers] = await Promise.all([
    getServices(),
    getTestimonials(),
    getCaseStudies(),
    getTeamMembers()
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Digital Presence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional digital services to help your business grow
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/services"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Our Services
              </Link>
              <Link
                href="/case-studies"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">
              Comprehensive digital solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service: Service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
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
                <h3 className="text-2xl font-bold mb-4">
                  {service.metadata.service_name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.metadata.short_description}
                </p>
                {service.metadata.starting_price && (
                  <p className="text-blue-600 font-semibold">
                    Starting at {service.metadata.starting_price}
                  </p>
                )}
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">
              See how we've helped businesses achieve their goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.slice(0, 2).map((caseStudy: CaseStudy) => (
              <Link
                key={caseStudy.id}
                href={`/case-studies/${caseStudy.slug}`}
                className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
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
                <div className="p-6 bg-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {caseStudy.metadata.project_name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {caseStudy.metadata.project_summary}
                  </p>
                  <p className="text-blue-600 font-semibold">
                    Read Case Study →
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/case-studies"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial: Testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {testimonial.metadata.client_photo && (
                    <img
                      src={`${testimonial.metadata.client_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={testimonial.metadata.client_name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      width="64"
                      height="64"
                    />
                  )}
                  <div>
                    <p className="font-bold">{testimonial.metadata.client_name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.metadata.client_role}
                      {testimonial.metadata.client_company && `, ${testimonial.metadata.client_company}`}
                    </p>
                  </div>
                </div>
                
                {testimonial.metadata.rating && (
                  <div className="flex text-yellow-400 mb-4">
                    {Array.from({ length: parseInt(testimonial.metadata.rating.key) }).map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
                
                <p className="text-gray-700 italic">
                  "{testimonial.metadata.testimonial_quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Experts dedicated to your success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.slice(0, 3).map((member: TeamMember) => (
              <div key={member.id} className="text-center">
                {member.metadata.photo && (
                  <img
                    src={`${member.metadata.photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={member.metadata.full_name}
                    className="w-48 h-48 rounded-full object-cover mx-auto mb-4"
                    width="192"
                    height="192"
                  />
                )}
                <h3 className="text-2xl font-bold mb-2">
                  {member.metadata.full_name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {member.metadata.job_title}
                </p>
                {member.metadata.bio && (
                  <p className="text-gray-700 mb-4">
                    {member.metadata.bio}
                  </p>
                )}
                <div className="flex gap-4 justify-center">
                  {member.metadata.linkedin_url && (
                    <a
                      href={member.metadata.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.metadata.twitter_handle && (
                    <a
                      href={`https://twitter.com/${member.metadata.twitter_handle.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/team"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Full Team
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's discuss how we can help transform your digital presence
          </p>
          <Link
            href="/services"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore Our Services
          </Link>
        </div>
      </section>
    </div>
  )
}
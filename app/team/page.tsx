import { getTeamMembers } from '@/lib/cosmic'
import { TeamMember } from '@/types'

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-gray-600">
            Meet the experts behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member: TeamMember) => (
            <div key={member.id} className="text-center">
              {member.metadata.photo && (
                <img
                  src={`${member.metadata.photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                  alt={member.metadata.full_name}
                  className="w-64 h-64 rounded-full object-cover mx-auto mb-6 shadow-lg"
                  width="256"
                  height="256"
                />
              )}
              
              <h2 className="text-2xl font-bold mb-2">
                {member.metadata.full_name}
              </h2>
              
              <p className="text-blue-600 font-semibold mb-4">
                {member.metadata.job_title}
              </p>
              
              {member.metadata.bio && (
                <p className="text-gray-700 mb-6">
                  {member.metadata.bio}
                </p>
              )}
              
              <div className="flex gap-4 justify-center">
                {member.metadata.email && (
                  <a
                    href={`mailto:${member.metadata.email}`}
                    className="text-gray-600 hover:text-blue-600"
                    title="Email"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                )}
                
                {member.metadata.linkedin_url && (
                  <a
                    href={member.metadata.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
                
                {member.metadata.twitter_handle && (
                  <a
                    href={`https://twitter.com/${member.metadata.twitter_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600"
                    title="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
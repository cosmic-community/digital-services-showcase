# Digital Services Showcase

![App Preview](https://imgix.cosmicjs.com/34c60330-c344-11f0-a34a-efbcf979242c-photo-1460925895917-afdab827c52f-1763335814381.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional company website built with Next.js 16 and Cosmic CMS. Showcase your digital services, team members, client testimonials, and successful case studies with a responsive, SEO-optimized design.

## Features

- 🎯 **Dynamic Services Showcase** - Display all your digital services with detailed information
- 👥 **Team Directory** - Highlight your team members with profiles and social links
- ⭐ **Client Testimonials** - Build trust with authentic client reviews and ratings
- 📊 **Case Study Portfolio** - Showcase successful projects with detailed metrics
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Server-side rendering with Next.js 16 for optimal performance
- 🔍 **SEO Optimized** - Built-in best practices for search engine visibility
- 🎨 **Modern Design** - Clean, professional interface with smooth animations

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=691a5dfe0991505b900f68c4&clone_repository=691a5fc40991505b900f68ea)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with digital services, team members, testimonials, and case studies"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a company website with digital services, team members, testimonials, and case studies', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React** - UI components and interactivity

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the digital services content model

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Team Members

```typescript
const { objects: teamMembers } = await cosmic.objects
  .find({ type: 'team-members' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Testimonials with Related Services

```typescript
const { objects: testimonials } = await cosmic.objects
  .find({ type: 'testimonials' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes related service data
```

### Fetching Case Studies

```typescript
const { objects: caseStudies } = await cosmic.objects
  .find({ type: 'case-studies' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes related services data
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS to manage all content. The content model includes:

- **Services** - Digital service offerings with descriptions, pricing, and features
- **Team Members** - Team profiles with photos, bios, and social links
- **Testimonials** - Client reviews with ratings and related services
- **Case Studies** - Project showcases with challenges, solutions, and results

All content is fetched server-side using the Cosmic SDK for optimal performance and SEO.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the deploy button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage
│   ├── services/           # Services pages
│   ├── team/               # Team pages
│   ├── testimonials/       # Testimonials page
│   └── case-studies/       # Case studies pages
├── components/             # Reusable components
├── lib/
│   └── cosmic.ts          # Cosmic SDK configuration
└── types.ts               # TypeScript type definitions
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

<!-- README_END -->
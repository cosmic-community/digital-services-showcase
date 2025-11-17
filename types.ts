export interface Product {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    description: string
    price: number
    featured_image: {
      url: string
      imgix_url: string
    }
    gallery?: Array<{
      url: string
      imgix_url: string
    }>
    category?: {
      id: string
      title: string
      slug: string
    }
    features?: string | string[]
    stock_quantity?: number
    sku?: string
  }
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    description?: string
    icon?: {
      url: string
      imgix_url: string
    }
  }
}

export interface Service {
  id: string
  title: string
  slug: string
  metadata: {
    service_name: string
    short_description: string
    full_description: string
    icon: {
      url: string
      imgix_url: string
    }
    starting_price: string
    features: string[]
  }
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  metadata: {
    project_name: string
    client_name: string
    project_summary: string
    challenge: string
    solution: string
    results: string
    featured_image: {
      url: string
      imgix_url: string
    }
    project_gallery?: Array<{
      url: string
      imgix_url: string
    }>
    related_services?: Service[]
    project_duration: string
    technologies_used: string[]
  }
}

export interface TeamMember {
  id: string
  title: string
  slug: string
  metadata: {
    full_name: string
    job_title: string
    bio: string
    photo: {
      url: string
      imgix_url: string
    }
    email: string
    linkedin_url?: string
    twitter_handle?: string
  }
}

export interface Testimonial {
  id: string
  title: string
  slug: string
  metadata: {
    client_name: string
    client_company: string
    client_role: string
    testimonial_quote: string
    client_photo: {
      url: string
      imgix_url: string
    }
    rating: {
      key: string
      value: string
    }
    related_service?: Service
  }
}

export interface Order {
  id: string
  title: string
  metadata: {
    customer_email: string
    customer_name: string
    order_total: number
    order_items: Array<{
      product_id: string
      product_name: string
      quantity: number
      price: number
    }>
    order_status: string
    stripe_session_id: string
    shipping_address?: {
      line1: string
      line2?: string
      city: string
      state: string
      postal_code: string
      country: string
    }
  }
}
// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Service type
export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    service_name: string;
    short_description: string;
    full_description?: string;
    icon?: {
      url: string;
      imgix_url: string;
    };
    starting_price?: string;
    features?: string[];
  };
}

// Team Member type
export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name: string;
    job_title: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    linkedin_url?: string;
    twitter_handle?: string;
  };
}

// Testimonial type
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name: string;
    client_company?: string;
    client_role?: string;
    testimonial_quote: string;
    client_photo?: {
      url: string;
      imgix_url: string;
    };
    rating?: {
      key: string;
      value: string;
    };
    related_service?: Service;
  };
}

// Case Study type
export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    project_name: string;
    client_name: string;
    project_summary: string;
    challenge?: string;
    solution?: string;
    results?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    project_gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    related_services?: Service[];
    project_duration?: string;
    technologies_used?: string[];
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    category_name: string;
    description?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name: string;
    description: string;
    price: number;
    currency: string;
    images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    category?: Category;
    stock_quantity?: number;
    sku?: string;
    features?: string[];
    specifications?: string;
  };
}

// Order type
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    order_number: string;
    customer_email: string;
    customer_name: string;
    items: Array<{
      product_id: string;
      product_name: string;
      quantity: number;
      price: number;
    }>;
    total_amount: number;
    currency: string;
    status: {
      key: string;
      value: string;
    };
    stripe_payment_intent_id?: string;
    shipping_address?: string;
    created_date: string;
  };
}

// Cart Item type (client-side only)
export interface CartItem {
  product: Product;
  quantity: number;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}
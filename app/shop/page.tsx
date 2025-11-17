import { getProducts, getCategories } from '@/lib/cosmic'
import { Product, Category } from '@/types'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Shop - Digital Products & Services',
  description: 'Browse our selection of premium digital products and services. Professional tools and resources to help your business grow.',
  keywords: ['digital products', 'shop', 'ecommerce', 'buy online', 'digital services'],
  canonical: '/shop',
})

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Shop
            </h1>
            <p className="text-xl text-blue-100 dark:text-blue-200">
              Premium digital products and services for your business
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/shop?category=${category.slug}`}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-lg transition-shadow text-center"
                >
                  {category.metadata.icon && (
                    <img
                      src={`${category.metadata.icon.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={category.metadata.name}
                      className="w-16 h-16 object-cover rounded-lg mx-auto mb-2"
                      width="64"
                      height="64"
                    />
                  )}
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {category.metadata.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">All Products</h2>
          
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: Product) => {
                if (!product || !product.metadata) return null
                
                return (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                  >
                    {product.metadata.gallery && 
                     product.metadata.gallery.length > 0 && 
                     product.metadata.gallery[0] && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={`${product.metadata.gallery[0].imgix_url}?w=600&h=384&fit=crop&auto=format,compress`}
                          alt={product.metadata.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width="300"
                          height="192"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                        {product.metadata.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {product.metadata.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ${product.metadata.price.toFixed(2)}
                        </span>
                        {product.metadata.stock_quantity !== undefined && 
                         product.metadata.stock_quantity <= 0 && (
                          <span className="text-red-600 dark:text-red-400 text-sm font-semibold">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
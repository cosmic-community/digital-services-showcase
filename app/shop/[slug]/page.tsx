// app/shop/[slug]/page.tsx
import { getProduct } from '@/lib/cosmic'
import { Product } from '@/types'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return generateSEOMetadata({
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    })
  }

  return generateSEOMetadata({
    title: `${product.metadata.name} - Shop`,
    description: product.metadata.description,
    canonical: `/shop/${slug}`,
  })
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const typedProduct = product as Product

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="p-8">
              {typedProduct.metadata.gallery && 
               typedProduct.metadata.gallery.length > 0 && 
               typedProduct.metadata.gallery[0] && (
                <div className="space-y-4">
                  <img
                    src={`${typedProduct.metadata.gallery[0].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                    alt={typedProduct.metadata.name}
                    className="w-full rounded-lg"
                    width="600"
                    height="600"
                  />
                  {typedProduct.metadata.gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {typedProduct.metadata.gallery.slice(1).map((image: { url: string; imgix_url: string }, index: number) => {
                        if (!image) return null
                        return (
                          <img
                            key={index}
                            src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                            alt={`${typedProduct.metadata.name} ${index + 2}`}
                            className="w-full rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                            width="100"
                            height="100"
                          />
                        )
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {typedProduct.metadata.name}
              </h1>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  ${typedProduct.metadata.price.toFixed(2)}
                </span>
                {typedProduct.metadata.currency && (
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    {typedProduct.metadata.currency.toUpperCase()}
                  </span>
                )}
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {typedProduct.metadata.description}
              </p>

              {typedProduct.metadata.features && 
               Array.isArray(typedProduct.metadata.features) && 
               typedProduct.metadata.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Features:</h3>
                  <ul className="space-y-2">
                    {typedProduct.metadata.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {typedProduct.metadata.specifications && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Specifications:</h3>
                  <div className="text-gray-700 dark:text-gray-300 prose dark:prose-invert">
                    <div dangerouslySetInnerHTML={{ __html: typedProduct.metadata.specifications }} />
                  </div>
                </div>
              )}

              {typedProduct.metadata.stock_quantity !== undefined && (
                <div className="mb-6">
                  {typedProduct.metadata.stock_quantity > 0 ? (
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      In Stock ({typedProduct.metadata.stock_quantity} available)
                    </p>
                  ) : (
                    <p className="text-red-600 dark:text-red-400 font-semibold">
                      Out of Stock
                    </p>
                  )}
                </div>
              )}

              <AddToCartButton product={typedProduct} />

              {typedProduct.metadata.sku && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                  SKU: {typedProduct.metadata.sku}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
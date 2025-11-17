'use client'

import { useCart } from '@/lib/cart'
import Link from 'next/link'
import { Trash2, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (data.sessionId) {
        const stripe = await import('@stripe/stripe-js').then(m => 
          m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        )
        
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId: data.sessionId })
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error initiating checkout. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const product = item.product
              if (!product || !product.metadata) return null

              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
                >
                  <div className="flex gap-4">
                    {product.metadata.images && 
                     product.metadata.images.length > 0 && 
                     product.metadata.images[0] && (
                      <img
                        src={`${product.metadata.images[0].imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                        alt={product.metadata.product_name}
                        className="w-24 h-24 object-cover rounded-lg"
                        width="96"
                        height="96"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {product.metadata.product_name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        ${product.metadata.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                          <button
                            onClick={() => updateQuantity(product.id, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${(product.metadata.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
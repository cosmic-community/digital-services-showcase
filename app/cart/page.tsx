'use client'

import { useState, useEffect } from 'react'
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal } from '@/lib/cart'
import { CartItem } from '@/types'
import Link from 'next/link'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCart(getCart())
    setIsLoading(false)
  }, [])

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updatedCart = updateCartItemQuantity(productId, quantity)
    setCart(updatedCart)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const handleRemove = (productId: string) => {
    const updatedCart = removeFromCart(productId)
    setCart(updatedCart)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const total = getCartTotal(cart)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading cart...</p>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your Cart</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center gap-6">
                  {item.product.metadata.images && item.product.metadata.images.length > 0 && (
                    <img
                      src={`${item.product.metadata.images[0].imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                      alt={item.product.metadata.product_name}
                      className="w-24 h-24 object-cover rounded-lg"
                      width="96"
                      height="96"
                    />
                  )}
                  
                  <div className="flex-1">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {item.product.metadata.product_name}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      ${item.product.metadata.price.toFixed(2)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        ${(item.product.metadata.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className="text-red-600 dark:text-red-400 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-blue-600 dark:bg-blue-700 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full text-center text-blue-600 dark:text-blue-400 mt-4 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/lib/cart'
import { CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isProcessing, setIsProcessing] = useState(true)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { clearCart } = useCart()

  useEffect(() => {
    const processOrder = async () => {
      if (!sessionId) {
        setError('Invalid checkout session')
        setIsProcessing(false)
        return
      }

      try {
        const response = await fetch('/api/process-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setOrderConfirmed(true)
          clearCart()
        } else {
          setError(data.error || 'Failed to process order')
        }
      } catch (err) {
        console.error('Order processing error:', err)
        setError('An error occurred while processing your order')
      } finally {
        setIsProcessing(false)
      }
    }

    processOrder()
  }, [sessionId, clearCart])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Processing your order...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we confirm your payment
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Order Processing Failed
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {error}
          </p>
          <Link
            href="/cart"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    )
  }

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return null
}
'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart'
import { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
    setIsAdded(true)
    window.dispatchEvent(new Event('cartUpdated'))
    
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  const isOutOfStock = product.metadata.stock_quantity !== undefined && product.metadata.stock_quantity <= 0

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            disabled={isOutOfStock}
          >
            -
          </button>
          <span className="w-16 text-center font-semibold text-gray-900 dark:text-white">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            disabled={isOutOfStock}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || isAdded}
        className="w-full bg-blue-600 dark:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isOutOfStock ? 'Out of Stock' : isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  )
}
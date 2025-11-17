'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        const items = get().items
        const existingItemIndex = items.findIndex(item => item.product.id === product.id)
        
        if (existingItemIndex > -1) {
          const existingItem = items[existingItemIndex]
          if (existingItem) {
            const newItems = [...items]
            newItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + quantity
            }
            set({ items: newItems })
          }
        } else {
          set({ items: [...items, { product, quantity }] })
        }
      },
      
      removeItem: (productId: string) => {
        set({ items: get().items.filter(item => item.product.id !== productId) })
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        const items = get().items
        const itemIndex = items.findIndex(item => item.product.id === productId)
        
        if (itemIndex > -1) {
          const item = items[itemIndex]
          if (item) {
            const newItems = [...items]
            newItems[itemIndex] = { ...item, quantity }
            set({ items: newItems })
          }
        }
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product.metadata.price * item.quantity)
        }, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
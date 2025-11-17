import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity: number) => {
        const items = get().items
        const existingItem = items.find((item: CartItem) => item.product.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map((item: CartItem) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, { product, quantity }]
          })
        }
      },
      
      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item: CartItem) => item.product.id !== productId)
        })
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
        } else {
          set({
            items: get().items.map((item: CartItem) =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          })
        }
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        return get().items.reduce((total: number, item: CartItem) => {
          return total + (item.product.metadata.price * item.quantity)
        }, 0)
      }
    }),
    {
      name: 'shopping-cart'
    }
  )
)
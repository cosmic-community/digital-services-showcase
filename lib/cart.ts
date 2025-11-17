'use client'

import { Product, CartItem } from '@/types'

const CART_KEY = 'cosmic-cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export function addToCart(product: Product, quantity: number = 1): void {
  const cart = getCart()
  const existingItem = cart.find(item => item.product.id === product.id)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ product, quantity })
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  
  // Dispatch custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'))
  }
}

export function removeFromCart(productId: string): void {
  const cart = getCart()
  const updatedCart = cart.filter(item => item.product.id !== productId)
  
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart))
  
  // Dispatch custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'))
  }
}

export function updateCartItemQuantity(productId: string, quantity: number): void {
  const cart = getCart()
  const item = cart.find(item => item.product.id === productId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      item.quantity = quantity
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
      
      // Dispatch custom event to notify other components
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'))
      }
    }
  }
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY)
  
  // Dispatch custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cartUpdated'))
  }
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + (item.product.metadata.price * item.quantity), 0)
}

export function getCartItemCount(): number {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}
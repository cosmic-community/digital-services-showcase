'use client'

import { Product, CartItem } from '@/types'

const CART_STORAGE_KEY = 'ecommerce_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY)
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error('Failed to get cart:', error)
    return []
  }
}

export function addToCart(product: Product, quantity: number = 1): CartItem[] {
  const cart = getCart()
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id)
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity
  } else {
    cart.push({ product, quantity })
  }
  
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string): CartItem[] {
  const cart = getCart()
  const updatedCart = cart.filter(item => item.product.id !== productId)
  saveCart(updatedCart)
  return updatedCart
}

export function updateCartItemQuantity(productId: string, quantity: number): CartItem[] {
  const cart = getCart()
  const itemIndex = cart.findIndex(item => item.product.id === productId)
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
    cart[itemIndex].quantity = quantity
    saveCart(cart)
  }
  
  return cart
}

export function clearCart(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CART_STORAGE_KEY)
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => {
    return total + (item.product.metadata.price * item.quantity)
  }, 0)
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0)
}

function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}
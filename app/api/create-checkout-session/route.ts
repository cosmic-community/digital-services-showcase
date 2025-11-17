import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CartItem } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia' as any, // Changed: Cast to any to resolve type mismatch with Stripe SDK
})

export async function POST(request: NextRequest) {
  try {
    const { cart, customerInfo } = await request.json()

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    const lineItems = cart.map((item: CartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.metadata.product_name,
          description: item.product.metadata.description,
          images: item.product.metadata.images?.[0]?.imgix_url 
            ? [`${item.product.metadata.images[0].imgix_url}?w=800&h=800&fit=crop&auto=format,compress`]
            : [],
        },
        unit_amount: Math.round(item.product.metadata.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      customer_email: customerInfo.email,
      metadata: {
        customer_name: customerInfo.name,
        shipping_address: customerInfo.address,
        cart: JSON.stringify(cart.map((item: CartItem) => ({
          product_id: item.product.id,
          product_name: item.product.metadata.product_name,
          quantity: item.quantity,
          price: item.product.metadata.price,
        }))),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout session error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
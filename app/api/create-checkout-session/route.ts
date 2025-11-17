import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.metadata.product_name,
          description: item.product.metadata.description,
          images: item.product.metadata.images?.[0]?.imgix_url 
            ? [`${item.product.metadata.images[0].imgix_url}?w=500&h=500&fit=crop&auto=format,compress`]
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
      success_url: `${request.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
      metadata: {
        items: JSON.stringify(items.map((item: any) => ({
          product_id: item.product.id,
          product_name: item.product.metadata.product_name,
          quantity: item.quantity,
          price: item.product.metadata.price,
        }))),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
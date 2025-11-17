import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/cosmic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    const items = JSON.parse(session.metadata?.items || '[]')
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const order = await createOrder({
      order_number: orderNumber,
      customer_email: session.customer_details?.email || '',
      customer_name: session.customer_details?.name || '',
      items: items,
      total_amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency || 'usd',
      status: 'Paid',
      stripe_payment_intent_id: session.payment_intent as string,
      shipping_address: session.customer_details?.address 
        ? JSON.stringify(session.customer_details.address)
        : '',
    })

    return NextResponse.json({ order })
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/cosmic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 400 }
      )
    }

    const orderNumber = `ORD-${Date.now()}`
    const cart = JSON.parse(session.metadata?.cart || '[]')

    await createOrder({
      order_number: orderNumber,
      customer_email: session.customer_email || '',
      customer_name: session.metadata?.customer_name || '',
      items: cart,
      total_amount: (session.amount_total || 0) / 100,
      currency: session.currency || 'usd',
      status: 'Paid',
      stripe_payment_intent_id: session.payment_intent as string,
      shipping_address: session.metadata?.shipping_address || '',
    })

    return NextResponse.json({ 
      success: true,
      orderNumber 
    })
  } catch (error) {
    console.error('Process order error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
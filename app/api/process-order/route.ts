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

    if (session.payment_status === 'paid') {
      const items = JSON.parse(session.metadata?.items || '[]')
      
      const orderData = {
        order_number: `ORD-${Date.now()}`,
        customer_email: session.customer_details?.email || 'unknown@example.com',
        customer_name: session.customer_details?.name || 'Unknown Customer',
        items,
        total_amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || 'usd',
        status: 'Completed',
        stripe_payment_intent_id: session.payment_intent as string,
      }

      const order = await createOrder(orderData)

      return NextResponse.json({ 
        success: true, 
        order,
        message: 'Order created successfully' 
      })
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { error: 'Error processing order' },
      { status: 500 }
    )
  }
}
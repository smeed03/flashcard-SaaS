import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-08-01' });

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

export async function POST(req) {
  const params = {
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Basic Plan',
          },
          unit_amount: formatAmountForStripe(1), // $1 in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/success`,
    cancel_url: `${req.headers.get('origin')}/cancel`,
  };

  try {
    const checkoutSession = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

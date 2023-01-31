import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

interface CartRequestType extends NextApiRequest {
  body: string[]
}

export default async function handler(req: CartRequestType, res: NextApiResponse) {
  const priceIds = req.body;
  
  const order = priceIds.map(priceId => {
    return { price: priceId, quantity: 1 }
  })

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!priceIds) {
    return res.status(400).json({ error: 'Price not found.' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: order
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
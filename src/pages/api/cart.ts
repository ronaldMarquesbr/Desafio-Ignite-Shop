import { stripe } from "@/lib/stripe";
import { CartProduct } from "@/reducers/cart/reducer";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface RequestType extends NextApiRequest {
    body: string[]
}

export default async function handler(req: RequestType, res: NextApiResponse){
  const productIds = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed." });
  }
  
  if (!productIds) {
    return res.status(400).json({ error: 'Prices not found.' });
  }

  const response = await stripe.products.list({
      ids: productIds,
      expand: ['data.default_price']
  })

  const cartProducts = response.data.map<CartProduct>(product => {
      const price = product.default_price as Stripe.Price;
  
      return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        formattedPrice: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        price: price.unit_amount,
        priceId: price.id
      }
    })
  
    res.json(cartProducts)
}
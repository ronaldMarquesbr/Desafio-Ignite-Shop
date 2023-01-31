import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  SuccessContainer,
  ImageGrid,
} from '../styles/pages/success'

interface SuccessProps {
  costumerName: string
  order: {
    name: string
    imageUrl: string
  }[]
}

export default function Success({ costumerName, order }: SuccessProps) {
  const orderLength = order.length
  const halfOrderAmount = orderLength / 2
  const isEven = order.length % 2 === 0

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageGrid>
          {order.map((product, index) => {
            return (
              <ImageContainer key={product.name}>
                <Image src={product.imageUrl} width={160} height={160} alt="" />
              </ImageContainer>
            )
          })}
        </ImageGrid>

        <p>
          Uhuul! <strong>{costumerName}</strong>, sua compra de {order.length}{' '}
          camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({
  query,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const costumerName = session.customer_details.name
  const products = session.line_items.data.map((item) => {
    return item.price.product
  }) as Stripe.Product[]

  const order = products.map((product) => {
    return {
      imageUrl: product.images[0],
      name: product.name,
    }
  })

  return {
    props: {
      costumerName,
      order,
    },
  }
}

import Image from "next/image"
import Head from 'next/head'
import { GetStaticProps } from "next"
import Link from "next/link"

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import { HomeContainer, Product, AddToCartButton, SliderContainer } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { Handbag } from "phosphor-react"
import { useContext, useState } from "react"
import { CartContext } from "@/contexts/CartContext"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const { addProductIdToCart, searchProductInCart } = useContext(CartContext)
  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      origin: 0.19,
      perView: 3,
      spacing: 48,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    }
  });

  function HandleAddItemToCart(event){
    const productId = event.target.value
    if(!searchProductInCart(productId)){
      addProductIdToCart(productId) 
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      
      <SliderContainer>
        <HomeContainer ref={sliderRef} className="keen-slider">
          {products.map(product => {
            return (
              <Product key={product.id}  className="keen-slider__slide">
                <Link href={`/product/${product.id}`} prefetch={false}>
                  <Image src={product.imageUrl} width={520} height={480} alt="" />
                </Link>
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <AddToCartButton value={product.id} onClick={HandleAddItemToCart}>
                    <Handbag size={32} color={'white'} />
                  </AddToCartButton>
                </footer>
              </Product>
            )
          })}
        </HomeContainer>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) => {
                console.log(instanceRef)
                return e.stopPropagation() || instanceRef.current?.prev()
                }
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>{
                (currentSlide >= instanceRef.current.track.details.slides.length - 2) ? e.stopPropagation() : instanceRef.current?.next()
              }
              }
              disabled={
                currentSlide === instanceRef.current.track.details.slides.length - 2
              }
            />
          </>
        )}
      </SliderContainer>
    </>
  )
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}
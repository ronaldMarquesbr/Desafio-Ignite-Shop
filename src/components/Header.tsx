import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import logoImage from '../assets/logo.svg'
import { HeaderContainer, CartButton } from '@/styles/components/Header'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/contexts/CartContext'
import * as Dialog from '@radix-ui/react-dialog'
import { CartSidebar } from './Sidebar'
import axios, { AxiosResponse } from 'axios'

interface ResponseCartType extends AxiosResponse {
  data: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceId: string
    formattedPrice: string
  }[]
}

export function Header() {
  const {
    cart: { productIds },
    addProductsToCart,
  } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false)

  async function handleOpenModal() {
    if (productIds.length > 0 && !isOpen) {
      try {
        axios
          .post<any, ResponseCartType, string[]>('/api/cart', productIds)
          .then((res) => {
            const cartProducts = res.data
            addProductsToCart(cartProducts)
            setIsOpen(true)
          })
      } catch {
        alert('erro ao carregar o carrinho de compras')
      }
    }
  }
  return (
    <HeaderContainer>
      <Image src={logoImage.src} alt="" width={130} height={52} />
      <Dialog.Root open={isOpen} onOpenChange={handleOpenModal}>
        <Dialog.Trigger asChild>
          <CartButton>
            <Handbag size={24} />
            {productIds.length > 0 ? <span>{productIds.length}</span> : ''}
          </CartButton>
        </Dialog.Trigger>
        <CartSidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      </Dialog.Root>
    </HeaderContainer>
  )
}

import * as Dialog from '@radix-ui/react-dialog'
import {
  OverlayContainer,
  SidebarContainer,
  CartSidebarHeader,
  SidebarContent,
  CartItem,
  CartList,
  CartSummary,
  ButtonCheckout,
  CloseSidebar,
} from '@/styles/components/Sidebar'
import { X } from 'phosphor-react'
import { useContext, SetStateAction, useEffect } from 'react'
import { CartContext } from '@/contexts/CartContext'
import Image from 'next/image'
import axios from 'axios'

interface CartSideBarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
}

export function CartSidebar({ setIsOpen }: CartSideBarProps) {
  const {
    cart: { products, productIds, total },
    removeProductToCart,
  } = useContext(CartContext)

  function handleRemoveItemToCart(event) {
    const productIdToRemove = event.target.value
    removeProductToCart(productIdToRemove)
  }

  function handleCheckout() {
    const priceIds = products.map((product) => product.priceId)
    axios.post('/api/checkout', priceIds).then((response) => {
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay asChild>
        <OverlayContainer />
      </Dialog.Overlay>
      <Dialog.Content asChild>
        <SidebarContainer>
          <Dialog.Close
            asChild
            onClick={() => {
              setIsOpen(false)
            }}
          >
            <CloseSidebar>
              <X size={24} />
            </CloseSidebar>
          </Dialog.Close>
          <SidebarContent>
            <div>
              <CartSidebarHeader>
                <Dialog.Title>
                  <strong>Sacola de compras</strong>
                </Dialog.Title>
              </CartSidebarHeader>
              <CartList>
                {products.map((product) => {
                  return (
                    <CartItem key={product.id}>
                      <Image
                        width={102}
                        height={94}
                        src={product.imageUrl}
                        alt=""
                      />
                      <div>
                        <p>{product.name}</p>
                        <strong>{product.formattedPrice}</strong>

                        <button
                          value={product.id}
                          onClick={handleRemoveItemToCart}
                        >
                          Remover
                        </button>
                      </div>
                    </CartItem>
                  )
                })}
              </CartList>
            </div>
            <div>
              <CartSummary>
                <tbody>
                  <tr className="amount">
                    <td>Quantidade</td>
                    <td className="itemsAmount">{productIds.length}</td>
                  </tr>
                  <tr>
                    <td className="value">
                      <strong>Valor total</strong>
                    </td>
                    <td>
                      <strong className="value">{total}</strong>
                    </td>
                  </tr>
                </tbody>
              </CartSummary>
              <ButtonCheckout onClick={handleCheckout}>
                Finalizar compra
              </ButtonCheckout>
            </div>
          </SidebarContent>
        </SidebarContainer>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

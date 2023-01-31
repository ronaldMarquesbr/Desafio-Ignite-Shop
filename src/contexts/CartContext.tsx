import {
  addProductIdToCartAction,
  addProductsToCartAction,
  removeProductToCartAction,
} from '@/reducers/cart/actions'
import { CartProduct, cartReducer, CartType } from '@/reducers/cart/reducer'
import { createContext, ReactNode, useEffect, useReducer } from 'react'

interface CartContextProviderProps {
  children: ReactNode
}

interface CartContexType {
  cart: CartType
  addProductIdToCart: (productId: string) => void
  addProductsToCart: (products: CartProduct[]) => void
  removeProductToCart: (productId: string) => void
  searchProductInCart: (productId: string) => boolean
}

export const CartContext = createContext({} as CartContexType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, {
    productIds: [],
    products: [],
    total: '',
  })

  function addProductIdToCart(productId: string) {
    dispatch(addProductIdToCartAction(productId))
  }

  function addProductsToCart(products: CartProduct[]) {
    dispatch(addProductsToCartAction(products))
  }

  function removeProductToCart(productId: string) {
    dispatch(removeProductToCartAction(productId))
  }

  function searchProductInCart(productId: string) {
    if (cart.productIds.find((element) => productId === element)) {
      return true
    } else {
      return false
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductIdToCart,
        addProductsToCart,
        removeProductToCart,
        searchProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

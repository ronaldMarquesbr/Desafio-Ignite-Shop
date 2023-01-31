import { ActionTypes } from './actions'

export interface CartProduct {
  name: string
  id: string
  priceId: string
  price: number
  formattedPrice: string
  imageUrl: string
}

export interface CartType {
  productIds: string[]
  products: CartProduct[]
  total: string
}

export function cartReducer(state: CartType, action): CartType {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT_ID_TO_CART:
      const productId = action.payload
      const updatedProductIds = [].concat(state.productIds, productId)

      return {
        ...state,
        productIds: updatedProductIds,
      }
    case ActionTypes.CLEAR_CART:
      return {
        productIds: [],
        products: [],
        total: '',
      }

    case ActionTypes.REMOVE_ITEM_TO_CART: {
      const productIdToRemove = action.payload
      const updatedProducts = state.products.filter(
        (product) => product.id !== productIdToRemove,
      )
      const updatedProductsId = state.productIds.filter(
        (productId) => productId !== productIdToRemove,
      )
      const newTotal = updatedProducts.reduce((acc, product) => {
        return (acc += product.price)
      }, 0)
      const formattedTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(newTotal / 100)

      return {
        productIds: updatedProductsId,
        products: updatedProducts,
        total: formattedTotal,
      }
    }

    case ActionTypes.ADD_PRODUCTS_TO_CART: {
      const newProducts = action.payload
      const newTotal = newProducts.reduce((acc, product) => {
        return (acc += product.price)
      }, 0)
      const formattedTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(newTotal / 100)

      return {
        ...state,
        products: newProducts,
        total: formattedTotal,
      }
    }
    default:
      return state
  }
}

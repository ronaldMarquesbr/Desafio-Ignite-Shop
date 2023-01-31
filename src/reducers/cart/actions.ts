import { CartProduct } from './reducer'

export enum ActionTypes {
  ADD_PRODUCT_ID_TO_CART = 'ADD_PRODUCT_ID_TO_CART',
  ADD_PRODUCTS_TO_CART = 'ADD_PRODUCTS_TO_CART',
  REMOVE_ITEM_TO_CART = 'REMOVE_ITEM_TO_CART',
  CLEAR_CART = 'CLEAR_CART',
}

export function addProductIdToCartAction(productId: string) {
  return {
    type: ActionTypes.ADD_PRODUCT_ID_TO_CART,
    payload: productId,
  }
}

export function addProductsToCartAction(products: CartProduct[]) {
  return {
    type: ActionTypes.ADD_PRODUCTS_TO_CART,
    payload: products,
  }
}

export function clearCartAction() {
  return {
    type: ActionTypes.CLEAR_CART,
  }
}

export function removeProductToCartAction(productId: string) {
  return {
    type: ActionTypes.REMOVE_ITEM_TO_CART,
    payload: productId,
  }
}

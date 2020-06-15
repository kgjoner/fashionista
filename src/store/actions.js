import { fetchProducts } from '../services/api'
import turnToSlug from '../utils/turnToSlug'
import {
  GET_PRODUCTS_STARTED,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  DISPLAY_PRODUCT,
  SET_ERROR,
  DISMISS_ERROR,
  DISMISS_SUCCESS,
  CLEAR_SINGLE_PRODUCT,
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL
} from './actionTypes'


export const getProducts = () => {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCTS_STARTED })

    return fetchProducts().then(
      data => dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: data
      }),
      err => dispatch({
        type: GET_PRODUCTS_FAILURE,
        payload: {...err, name: "Cannot get"}
      }))
  }
}


export const displayProduct = (slug) => {
  return (dispatch, getState) => {
    if(getState().error?.name === 'Cannot get') return //it prevents an infinite loop

    const products = getState().products

    if(!products.length) {
      return dispatch(getProducts())
        .then(() => dispatch(displayProduct(slug)))
    }

    const product = products.find(p => {
      return turnToSlug(p.name) === slug
    })

    dispatch({
      type: DISPLAY_PRODUCT,
      payload: product
    })
  }
}


export const clearSingleProduct = () => {
  return { type: CLEAR_SINGLE_PRODUCT }
}


export const addProductToCart = ({ quantity = 1, ...product }) => {
  const { name, size } = product
  if(!size) return {
      type: SET_ERROR,
      payload: { name: 'No Size', message: 'É necessário escolher um tamanho.' }
    }

  return (dispatch, getState) => {
    const wasAlreadyAdded = getState().shoppingCart.find(cartProduct => {
      return cartProduct.name === name && cartProduct.size === size
    })

    if(wasAlreadyAdded) {
      dispatch(addQuantity({ name, size, alert: true }))
    } else {
      dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: { ...product, quantity }
      })
    }
  }
}


export const removeProductFromCart = ({ name, size }) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: { name, size }
  }
}


export const addQuantity = ({ name, size, alert = false }) => {
  return {
    type: ADD_QUANTITY,
    payload: { name, size, alert }
  }
}


export const subtractQuantity = ({ name, size }) => {
  return {
    type: SUBTRACT_QUANTITY,
    payload: { name, size }
  }
}


export const dismissError = () => {
  return { type: DISMISS_ERROR }
}


export const dismissSuccess = () => {
  return { type: DISMISS_SUCCESS }
}


export const openSidePanel = (payload) => {
  return { 
    type: OPEN_SIDE_PANEL,
    payload
  }
}


export const closeSidePanel = () => {
  return { type: CLOSE_SIDE_PANEL }
}
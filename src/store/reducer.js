import {
  GET_PRODUCTS_STARTED,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  DISPLAY_PRODUCT,
  CLEAR_SINGLE_PRODUCT,
  SET_ERROR,
  DISMISS_ERROR,
  DISMISS_SUCCESS,
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL,
  sidePanels
} from './actionTypes'


export const initialState =  {
  products: [],
  shoppingCart: [],
  singleProduct: null,
  fetching: false,
  error: null,
  success: null,
  sidePanel: sidePanels.NONE
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case GET_PRODUCTS_STARTED:
      return Object.assign({}, state, {
        fetching: true
      })
    case GET_PRODUCTS_SUCCESS:
      return Object.assign({}, state, {
        products: [...payload],
        fetching: false
      })
    case GET_PRODUCTS_FAILURE:
      return Object.assign({}, state, {
        fetching: false,
        error: payload
      })

    case DISPLAY_PRODUCT:
      return Object.assign({}, state, {
        singleProduct: payload
      })
    case CLEAR_SINGLE_PRODUCT:
      return Object.assign({}, state, {
        singleProduct: null
      })

    case ADD_PRODUCT_TO_CART:
      return Object.assign({}, state, {
        shoppingCart: [...state.shoppingCart, payload],
        success: 'Produto adicionado à sacola!'
      })
    case REMOVE_PRODUCT_FROM_CART: {
      const { name, size } = payload
      return Object.assign({}, state, {
        shoppingCart: state.shoppingCart.filter(product => {
          return product.name !== name || product.size !== size
        })
      })
    }

    case ADD_QUANTITY: {
      const { name, size, alert } = payload
      const success = alert ? 'Mais uma unidade adicionada à sacola!' : state.success
      return Object.assign({}, state, {
        shoppingCart: state.shoppingCart.map(product => {
          if(product.name === name && product.size === size) {
            return {...product, quantity: product.quantity + 1}
          }
          return product
        }),
        success
      })
    }
    case SUBTRACT_QUANTITY:
      const { name, size } = payload
      return Object.assign({}, state, {
        shoppingCart: state.shoppingCart.map(product => {
          if(product.name === name && product.size === size) {
            return {...product, quantity: Math.max(product.quantity - 1, 1)}
          }
          return product
        })
      })

    case SET_ERROR:
      return Object.assign({}, state, {
        error: payload
      })
    case DISMISS_ERROR:
      return Object.assign({}, state, {
        error: null
      })

    case DISMISS_SUCCESS:
      return Object.assign({}, state, {
        success: null
      })

    case OPEN_SIDE_PANEL:
      return Object.assign({}, state, {
        sidePanel: payload
      })
    case CLOSE_SIDE_PANEL:
      return Object.assign({}, state, {
        sidePanel: sidePanels.NONE
      })

    default:

      return state
  }
}
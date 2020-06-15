import * as api from '../infrastructure/api'
import { getMockStore, runActionsOnReducer } from '../utils/testStore'
import { 
  GET_PRODUCTS_STARTED, 
  GET_PRODUCTS_SUCCESS, 
  GET_PRODUCTS_FAILURE,
  DISPLAY_PRODUCT,
  CLEAR_SINGLE_PRODUCT,
  ADD_PRODUCT_TO_CART,
  SET_ERROR,
  REMOVE_PRODUCT_FROM_CART,
  ADD_QUANTITY,
  SUBTRACT_QUANTITY,
  DISMISS_SUCCESS,
  DISMISS_ERROR,
  CLOSE_SIDE_PANEL,
  OPEN_SIDE_PANEL,
  sidePanels,
} from './actionTypes'
import * as actions from './actions'
import { initialState, reducer } from './reducer'
import turnToSlug from '../utils/turnToSlug'
import { 
  mockProducts, 
  mockError, 
  mockProduct,
  mockSelectedProduct,
  mockCart,
  mockSuccess
} from '../mocks'


const mockFetch = jest.spyOn(api, 'fetchProducts')
const mockGetError = {...mockError, name: "Cannot get"}


describe('Store', () => { 
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  let store;


/* ========================================================================================
  1. Get Products
  ========================================================================================= */ 

  describe('Get Products', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      store = getMockStore()
    })

    it('should dispatch the action to announce it started getting the products', () => {
      mockFetch.mockResolvedValue()
      const expectedActions = [
        { type: GET_PRODUCTS_STARTED }
      ]

      store.dispatch(actions.getProducts())
      expect(store.getActions()).toEqual(expectedActions)  
    })

  
    it('should make an api call and then set the products', () => {
      mockFetch.mockResolvedValueOnce(mockProducts)
      const expectedActions = [
        { type: GET_PRODUCTS_STARTED },
        {
          type: GET_PRODUCTS_SUCCESS,
          payload: mockProducts
        }
      ]
      const expectedState = {
        ...initialState,
        products: [...mockProducts]
      }

      return store.dispatch(actions.getProducts()).then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(store.getActions()).toEqual(expectedActions)
        const state = runActionsOnReducer(store.getActions(), store.getState())
        expect(state).toEqual(expectedState)
      })
    })


    it('should set the error if products could not be gotten via api', () => {
      mockFetch.mockRejectedValueOnce(mockError)
      const expectedActions = [
        { type: GET_PRODUCTS_STARTED },
        {
          type: GET_PRODUCTS_FAILURE,
          payload: mockGetError
        }
      ]
      const expectedState = {
        ...initialState,
        error: mockGetError
      }
  
      return store.dispatch(actions.getProducts()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        const state = runActionsOnReducer(store.getActions(), store.getState())
        expect(state).toEqual(expectedState)  
      })
    })
  })


/* ========================================================================================
  2. Display Product
  ========================================================================================= */ 

  describe('Display Product', () => {
    const slug = turnToSlug(mockProduct.name)

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should dispatch the action and set the single product', () => {
      store = getMockStore({ products: mockProducts })
      const expectedAction = {
        type: DISPLAY_PRODUCT,
        payload: mockProduct
      }

      store.dispatch(actions.displayProduct(slug))
      expect(store.getActions()).toContainEqual(expectedAction)

      const expectedState = {
        ...initialState,
        products: mockProducts,
        singleProduct: mockProduct
      }

      const state = runActionsOnReducer(store.getActions(), store.getState())
      expect(state).toEqual(expectedState)
    })


    it('should trigger the getProducts action if there is no product and then call itself again', () => {
      store = getMockStore(() => {
        if(mockFetch.mock.calls.length) {
          return {...initialState, products: mockProducts}
        } else {
          return initialState
        }
      })
      mockFetch.mockResolvedValueOnce(mockProducts)
      const expectedState = {
        ...initialState,
        products: mockProducts,
        singleProduct: mockProduct
      }
      
      return store.dispatch(actions.displayProduct(slug)).then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1)
        const state = runActionsOnReducer(store.getActions(), store.getState())
        expect(state).toEqual(expectedState)  
      })
    })


    it('should do nothing if there is an "Cannot get" error', () => {
      store = getMockStore({ error: mockGetError })
      store.dispatch(actions.displayProduct(slug))
      expect(store.getActions()).toEqual([])
    })
  })


/* ========================================================================================
  3. Clear Product
  ========================================================================================= */ 

  describe('Clear Product', () => {
    const expectedAction = { type: CLEAR_SINGLE_PRODUCT }

    beforeEach(() => {
      store = getMockStore({ singleProduct: mockProduct })
    })


    it('should dispatch the action to clear the product', () => {
      store.dispatch(actions.clearSingleProduct())
      expect(store.getActions()).toContainEqual(expectedAction)
    })


    it('should clear the single product', () => {
      const state = runActionsOnReducer([expectedAction], store.getState())
      expect(state).toEqual(initialState)
    })
  })


/* ========================================================================================
  4. Add Product to Cart
  ========================================================================================= */ 

  describe('Add Product to Cart', () => {
    beforeEach(() => {
      store = getMockStore()
    })
    

    it('should dispatch the action and add the product to cart', () => {
      const expectedAction = { 
        type: ADD_PRODUCT_TO_CART,
        payload: {...mockSelectedProduct, quantity: 1}
      }

      store.dispatch(actions.addProductToCart(mockSelectedProduct))
      expect(store.getActions()).toContainEqual(expectedAction)

      const expectedState = {
        ...initialState,
        shoppingCart: [{...mockSelectedProduct, quantity: 1}],
        success: 'Produto adicionado à sacola!'
      }
      const state = runActionsOnReducer(store.getActions(), store.getState())
      expect(state).toEqual(expectedState)
    })


    it('should set an error if no size was selected', () => {
      const payload = { ...mockSelectedProduct, size: null }
      const expectedAction = {
        type: SET_ERROR,
        payload: { name: 'No Size', message: 'É necessário escolher um tamanho.' }
      }
      const expectedState = {
        ...initialState,
        error: { name: 'No Size', message: 'É necessário escolher um tamanho.' }
      }

      store.dispatch(actions.addProductToCart(payload))
      expect(store.getActions()).toContainEqual(expectedAction)
      const state = runActionsOnReducer(store.getActions(), store.getState())
      expect(state).toEqual(expectedState)
    })


    it('should not add a duplicated product', () => {
      store = getMockStore({ shoppingCart: mockCart })
      const expectedAction = { 
        type: ADD_PRODUCT_TO_CART,
        payload: {...mockSelectedProduct, quantity: 1}
      }

      store.dispatch(actions.addProductToCart(mockSelectedProduct))
      expect(store.getActions()).not.toContainEqual(expectedAction)
    })
  })


/* ========================================================================================
  5. Remove Product from Cart
  ========================================================================================= */ 

  describe('Remove Product from Cart', () => {
    const expectedAction = { 
      type: REMOVE_PRODUCT_FROM_CART,
      payload: { name: mockSelectedProduct.name, size: mockSelectedProduct.size }
    }

    beforeEach(() => {
      store = getMockStore({ shoppingCart: mockCart })
    })

    it('should dispatch the action to remove the product', () => {
      store.dispatch(actions.removeProductFromCart(mockSelectedProduct))
      expect(store.getActions()).toContainEqual(expectedAction)
    })


    it('should remove the product from cart', () => {
      const state = runActionsOnReducer([expectedAction], store.getState())
      expect(state).toEqual(initialState)
    })
  })


/* ========================================================================================
  6. Add Quantity
  ========================================================================================= */ 

  describe('Add Quantity', () => {
    beforeEach(() => {
      store = getMockStore({ shoppingCart: mockCart })
    })


    it('should dispatch the action and add quantity', () => {
      const expectedAction = { 
        type: ADD_QUANTITY,
        payload: { name: mockSelectedProduct.name, size: mockSelectedProduct.size, alert: false }
      }

      store.dispatch(actions.addQuantity(mockSelectedProduct))
      expect(store.getActions()).toContainEqual(expectedAction)

      const expectedCart = [{
        ...mockCart[0],
        quantity: mockCart[0].quantity + 1
      }]
      const state = runActionsOnReducer(store.getActions(), store.getState())
      expect(state.shoppingCart).toEqual(expectedCart)
    })


    it('should add quantity and set an alert success', () => {
      const expectedSuccess = 'Mais uma unidade adicionada à sacola!'

      store.dispatch(actions.addQuantity({...mockSelectedProduct, alert: true}))
      const state = runActionsOnReducer(store.getActions(), store.getState())
      expect(state.success).toEqual(expectedSuccess)
    })

  })


/* ========================================================================================
  7. Subtract Quantity
  ========================================================================================= */ 

  describe('Subtract Quantity', () => {
    beforeEach(() => {
      store = getMockStore({ shoppingCart: mockCart })
    })


    it('should dispatch the action and subtract quantity', () => {
      const expectedAction = { 
        type: SUBTRACT_QUANTITY,
        payload: { name: mockSelectedProduct.name, size: mockSelectedProduct.size }
      }

      store.dispatch(actions.subtractQuantity(mockSelectedProduct))
      expect(store.getActions()).toContainEqual(expectedAction)

      const expectedCart = [{
        ...mockCart[0],
        quantity: mockCart[0].quantity - 1
      }]
      const state = runActionsOnReducer(store.getActions(), store.getState())
      expect(state.shoppingCart).toEqual(expectedCart)
    })

  })


/* ========================================================================================
  8. Dismiss Error
  ========================================================================================= */ 

  describe('Dismiss Error', () => {
    const expectedAction = { type: DISMISS_ERROR }

    beforeEach(() => {
      store = getMockStore({ error: mockError })
    })

    it('should dispatch the action to dismiss error', () => {
      store.dispatch(actions.dismissError())
      expect(store.getActions()).toContainEqual(expectedAction)
    })


    it('should clear the error', () => {
      const state = runActionsOnReducer([expectedAction], store.getState())
      expect(state).toEqual(initialState)
    })
  })


/* ========================================================================================
  9. Dismiss Success
  ========================================================================================= */ 

  describe('Dismiss Success', () => {
    const expectedAction = { type: DISMISS_SUCCESS }

    beforeEach(() => {
      store = getMockStore({ success: mockSuccess })
    })

    it('should dispatch the action to dismiss success', () => {
      store.dispatch(actions.dismissSuccess())
      expect(store.getActions()).toContainEqual(expectedAction)
    })


    it('should clear the success', () => {
      const state = runActionsOnReducer([expectedAction], store.getState())
      expect(state).toEqual(initialState)
    })
  })


/* ========================================================================================
  10. Open Side Panel
  ========================================================================================= */ 

  describe('Open Side Panel', () => {
    const expectedAction = { 
      type: OPEN_SIDE_PANEL,
      payload: sidePanels.CART
    }

    beforeEach(() => {
      store = getMockStore()
    })

    it('should dispatch the action to open panel', () => {
      store.dispatch(actions.openSidePanel(sidePanels.CART))
      expect(store.getActions()).toContainEqual(expectedAction)
    })


    it('should open the side panel', () => {
      const expectedState = {
        ...initialState,
        sidePanel: sidePanels.CART
      }
      const state = runActionsOnReducer([expectedAction], store.getState())
      expect(state).toEqual(expectedState)
    })
  })


/* ========================================================================================
  11. Close Side Panel
  ========================================================================================= */ 

  describe('Close Side Panel', () => {
    const expectedAction = { type: CLOSE_SIDE_PANEL }

    beforeEach(() => {
      store = getMockStore({ sidePanel: sidePanels.CART })
    })

    it('should dispatch the action to close panel', () => {
      store.dispatch(actions.closeSidePanel())
      expect(store.getActions()).toContainEqual(expectedAction)
    })


    it('should close the side panel', () => {
      const state = runActionsOnReducer([expectedAction], store.getState())
      expect(state).toEqual(initialState)
    })
  })

})
import React from 'react';
import { cleanup } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import { mockCart, cartValues } from '../../mocks'
import '@testing-library/jest-dom/extend-expect'

import Cart from './Cart'


let store = getMockStore()
const props = {
  closePanel: jest.fn()
}


describe('Cart Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render Cart component', () => {
    const { queryByRole, queryByText } = renderWithStoreAndRouter(<Cart {...props}/>, store)
    
    expect(queryByText('Sacola (0)')).toBeTruthy()
    expect(queryByText(/sacola está vazia/i)).toBeTruthy()
    expect(queryByRole('listitem')).toBeNull()
    expect(queryByText(/R\$ 0,00/)).toBeTruthy()
  })


  it('should display cart items if there is any', () => {
    store = getMockStore({ shoppingCart: mockCart })

    const { 
      queryAllByRole, 
      queryByLabelText, 
      queryByText 
    } = renderWithStoreAndRouter(<Cart {...props}/>, store)

    const expectedTitle = `Sacola (${cartValues.quantity})`

    expect(queryAllByRole('listitem').length).toBe(mockCart.length)
    expect(queryAllByRole('heading')[0]).toHaveTextContent(expectedTitle)
    expect(queryByText(/sacola está vazia/i)).toBeNull()
    expect(queryByLabelText('Subtotal')).toHaveTextContent(cartValues.subtotal)
  })
  
})
import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import * as actions from '../../store/actions'
import { mockProduct } from '../../mocks';
import '@testing-library/jest-dom/extend-expect'

import Product from './Product'


const store = getMockStore()
const props = {
  product: mockProduct
}
const mockAddToCart = jest.spyOn(actions, 'addProductToCart')


describe('Product Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render Product component', () => {
    const { queryByTitle, 
      queryByText, 
      queryByLabelText, 
      queryByRole 
    } = renderWithStoreAndRouter(<Product {...props}/>, store)
    
    expect(queryByText(mockProduct.name)).toBeTruthy()
    expect(queryByTitle(mockProduct.name)).toHaveAttribute('src', mockProduct.image)
    expect(queryByText(/%/)).toBeNull()
    expect(queryByLabelText(/^de R\$/)).toBeNull()
    expect(queryByLabelText(/^por R\$/)).toBeTruthy()
    expect(queryByText(/x R\$/)).toBeTruthy()
    expect(queryByRole('form')).toBeTruthy()
    expect(queryByText(/adicionar/i)).toBeTruthy()
  })


  it('should display the discount info if there was any', () => {
    props.product.discount_percentage = "20%"
    props.product.actual_price = "R$159,92"
    const { queryByText, queryByLabelText } = renderWithStoreAndRouter(<Product {...props}/>, store)

    expect(queryByText(/%/)).toBeTruthy()
    expect(queryByLabelText(/^de R\$/)).toBeTruthy()
  })


  it('should dispatch the add to cart action', () => {
    const { queryByText } = renderWithStoreAndRouter(<Product {...props}/>, store)
    const button = queryByText(/adicionar/i)

    fireEvent.click(button)

    expect(mockAddToCart).toHaveBeenCalledTimes(1)
  })
})
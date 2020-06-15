import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import { mockProducts } from '../../mocks'
import '@testing-library/jest-dom/extend-expect'

import SearchPanel from './SearchPanel'


let store = getMockStore({ products: mockProducts })
const props = {
  closePanel: jest.fn()
}


describe('SearchPanel Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render SearchPanel component', () => {
    const { 
      queryByRole, 
      queryByPlaceholderText, 
      queryByText 
    } = renderWithStoreAndRouter(<SearchPanel {...props}/>, store)
    
    expect(queryByRole('heading')).toHaveTextContent('Busca')
    expect(queryByPlaceholderText(/buscar/i)).toHaveFocus()
    expect(queryByText(/nenhum item encontrado/i)).toBeTruthy()
    expect(queryByRole('listitem')).toBeNull()
  })


  it('should change the query when typing', () => {
    const { 
      queryByPlaceholderText, 
      queryAllByRole, 
      queryByText 
    } = renderWithStoreAndRouter(<SearchPanel {...props}/>, store)

    const searchBox = queryByPlaceholderText(/buscar/i)
    fireEvent.input(searchBox, { target: { value: 'vestido' } })

    expect(searchBox).toHaveValue('vestido')
    expect(queryAllByRole('listitem').length).toBe(2)
    expect(queryByText(/nenhum item encontrado/i)).toBeNull()
  })
  
})
import React from 'react';
import { cleanup } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import { mockProducts } from '../../mocks'
import '@testing-library/jest-dom/extend-expect'

import Catalog from './Catalog'


let store = getMockStore({ products: mockProducts })


describe('Catalog Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render Catalog component', () => {
    const { queryByRole, queryByText } = renderWithStoreAndRouter(<Catalog />, store)
    
    expect(queryByText('Catálogo')).toBeTruthy()
    expect(queryByRole('list').children.length).toEqual(mockProducts.length)
  })
    
})
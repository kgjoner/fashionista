import React from 'react';
import { cleanup } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import * as actions from '../../store/actions'
import { mockProducts, mockProduct } from '../../mocks'
import '@testing-library/jest-dom/extend-expect'

import CatalogRoute from './CatalogRoute'


let store = getMockStore()
const mockGet = jest.spyOn(actions, 'getProducts')
const mockClear = jest.spyOn(actions, 'clearSingleProduct')


describe('CatalogRoute Component', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render CatalogRoute loading products', () => {
    const { queryByRole, queryByText } = renderWithStoreAndRouter(<CatalogRoute />, store)
    
    expect(mockGet).toHaveBeenCalledTimes(1)
    expect(queryByText(/carregando/i)).toBeTruthy()
    expect(queryByRole('list')).toBeNull()
    expect(queryByRole('contentinfo')).toBeTruthy()
  })


  it('should render CatalogRoute with Catalog', () => {
    store = getMockStore({ products: mockProducts })
    const { queryByRole, queryByText } = renderWithStoreAndRouter(<CatalogRoute />, store)
    
    expect(mockGet).not.toHaveBeenCalled()
    expect(queryByRole('list')).toBeTruthy()
    expect(queryByText(/carregando/i)).toBeNull()
  })


  it('should clear the singleProduct if there is any', () => {
    store = getMockStore({ singleProduct: mockProduct })
    renderWithStoreAndRouter(<CatalogRoute />, store)
    
    expect(mockClear).toHaveBeenCalledTimes(1)
  })

})
import React from 'react';
import routeData from 'react-router';
import { cleanup } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import * as actions from '../../store/actions'
import { mockProduct } from '../../mocks'
import '@testing-library/jest-dom/extend-expect'

import ProductRoute from './ProductRoute'


let store = getMockStore({ singleProduct: mockProduct })
const mockDisplay = jest.spyOn(actions, 'displayProduct')
const mockCloseSidePanel = jest.spyOn(actions, 'closeSidePanel')

jest.spyOn(routeData, 'useParams')
  .mockReturnValue({ productSlug: mockProduct.name.toLowerCase().split(' ').join('_') })


describe('ProductRoute Component', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render ProductRoute updating single product and closing side panel', () => {
    const { queryByText } = renderWithStoreAndRouter(<ProductRoute />, store)
    
    expect(mockDisplay).toHaveBeenCalledTimes(1)
    expect(mockCloseSidePanel).toHaveBeenCalledTimes(1)
    expect(queryByText(mockProduct.name)).toBeTruthy()
  })

})
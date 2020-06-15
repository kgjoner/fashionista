import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import * as actions from '../../store/actions'
import { sidePanels } from '../../store/actionTypes';
import '@testing-library/jest-dom/extend-expect'

import Header from './Header'


let store = getMockStore()
let mockOpenSidePanel = jest.spyOn(actions, 'openSidePanel') 


describe('Header Component', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render the Header component', () => {
    const { 
      queryByRole, 
      queryByAltText, 
      queryByLabelText 
    } = renderWithStoreAndRouter(<Header />, store)
    
    expect(queryByRole('link')).toContainElement(queryByAltText('logotipo'))
    expect(queryByLabelText(/procurar produto/i)).toBeTruthy()
    expect(queryByLabelText(/abrir sacola/i)).toBeTruthy()
  })


  it('should dispatch the action to open the Search box', () => {
    const { queryByLabelText } = renderWithStoreAndRouter(<Header />, store)
    fireEvent.click(queryByLabelText(/procurar produto/i))

    expect(mockOpenSidePanel).toHaveBeenCalledWith(sidePanels.SEARCH)    
  })


  it('should dispatch the action to open the Cart', () => {
    const { queryByLabelText } = renderWithStoreAndRouter(<Header />, store)
    fireEvent.click(queryByLabelText(/abrir sacola/i))

    expect(mockOpenSidePanel).toHaveBeenCalledWith(sidePanels.CART)    
  })
})
import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react'
import { renderWithStoreAndRouter, getMockStore } from '../../utils/testStore'
import { sidePanels } from '../../store/actionTypes';
import '@testing-library/jest-dom/extend-expect'

import SidePanel from './SidePanel'


let store = getMockStore()


describe('SidePanel Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render an empty SidePanel component in the initial state', () => {
    const { queryByRole } = renderWithStoreAndRouter(<SidePanel />, store)
    
    expect(queryByRole('complementary')).toBeEmpty()
    expect(queryByRole('presentation')).toBeNull()
  })


  it('should display the Cart inside the panel when state ask for', () => {
    store = getMockStore({ sidePanel: sidePanels.CART })

    const { queryByRole, queryByText } = renderWithStoreAndRouter(<SidePanel />, store)

    expect(queryByRole('complementary')).toHaveClass('side-panel--draw')
    expect(queryByText(/sacola \(\d+\)/i)).toBeTruthy()
    expect(queryByRole('presentation')).toBeTruthy()
  })


  it('should display the Search box inside the panel when state ask for', () => {
    store = getMockStore({ sidePanel: sidePanels.SEARCH })

    const { queryByRole, queryByText } = renderWithStoreAndRouter(<SidePanel />, store)

    expect(queryByRole('complementary')).toHaveClass('side-panel--draw')
    expect(queryByText(/busca/i)).toBeTruthy()
    expect(queryByRole('presentation')).toBeTruthy()
  })


  it('should set "putback" classes when it is about to return to the initial state', () => {
    const { queryByRole } = renderWithStoreAndRouter(<SidePanel />, store)
    const background = queryByRole('presentation')
    fireEvent.mouseDown(background)

    expect(queryByRole('complementary')).toHaveClass('side-panel--putback')
    expect(background).toHaveClass('side-panel__bg--putback')
  })
  
})
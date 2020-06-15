import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { mockSizes } from '../../mocks'
import '@testing-library/jest-dom/extend-expect'

import SizeSelector from './SizeSelector'


const props = {
  sizes: mockSizes,
  selectedSize: null,
  setSelectedSize: jest.fn(),
  error: null
}


describe('SizeSelector Component', () => {
  afterEach(() => {
    cleanup()
  })


  it('should render SizeSelector component', () => {
    const { queryByLabelText, queryByText } = render(<SizeSelector {...props}/>)

    expect(queryByText('Escolha o tamanho')).toBeTruthy()
    props.sizes.forEach(size => {
      if(size.available) {
        expect(queryByLabelText(size.size)).toBeTruthy()
      } else {
        expect(queryByLabelText(size.size)).toBeNull()
      }
    })
  })


  it('should set a new selected size', () => {
    const { queryByLabelText } = render(<SizeSelector {...props}/>)
    const radio = queryByLabelText('P')
    fireEvent.click(radio)

    expect(props.setSelectedSize).toHaveBeenCalledTimes(1)
  })


  it('should display the selected size as checked', () => {
    props.selectedSize = 'P'
    const { queryByLabelText } = render(<SizeSelector {...props}/>)

    expect(queryByLabelText('P')).toBeChecked()
  })


  it('should announce an error', () => {
    props.error = { name: 'No Size', message: '...' }
    const { queryByLabelText } = render(<SizeSelector {...props}/>)

    expect(queryByLabelText('Escolha o tamanho')).toHaveClass('size-selector--error')
  })
  
})
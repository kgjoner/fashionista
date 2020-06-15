import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import { mockProduct } from '../../mocks'
import '@testing-library/jest-dom/extend-expect'

import ListedProduct from './ListedProduct'


const props = {
  product: {
    ...mockProduct,
    discount_percentage: '',
    actual_price: mockProduct.regular_price,
  }
}

const actions = {
  add: jest.fn(),
  subtract: jest.fn(),
  remove: jest.fn()
}


describe('ListedProduct Component', () => {
  afterEach(() => {
    cleanup()
  })


  it('should render a basic ListedProduct component', () => {
    const { queryByTitle, queryByText, queryByLabelText, queryByRole } = render(<ListedProduct {...props}/>)

    expect(queryByText(props.product.name)).toBeTruthy()
    expect(queryByTitle(props.product.name)).toHaveAttribute('src', props.product.image)
    expect(queryByText(/%/)).toBeNull()
    expect(queryByLabelText(/^de R\$/)).toBeNull()
    expect(queryByLabelText(/^por R\$/)).toBeTruthy()
    expect(queryByText(/x R\$/)).toBeTruthy()
    expect(queryByRole('button')).toBeNull()
  })


  it('should format info in a column instead of a row if asked for', () => {
    props.columnFormat = true
    const { queryByRole } = render(<ListedProduct {...props}/>)

    expect(queryByRole('listitem')).toHaveClass('listed-product--column')
    delete props.columnFormat
  })


  it('should display the discount info if there was any', () => {
    props.product.discount_percentage = "20%";
    props.product.actual_price = "R$159,92"
    const { queryByText, queryByLabelText, rerender } = render(<ListedProduct {...props}/>)

    expect(queryByText(/%/)).toBeTruthy()

    props.columnFormat = true
    rerender(<ListedProduct {...props}/>)

    expect(queryByLabelText(/^de R\$/)).toBeTruthy()
    delete props.columnFormat
  })


  it('should display a link to the product if linked', () => {
    props.linked = true
    const { queryByRole } = render(
      <BrowserRouter>
        <ListedProduct {...props}/>
      </BrowserRouter>
    )
    const expectedSlug = props.product.name.toLowerCase().split(' ').join('_')

    expect(queryByRole('link')).toHaveAttribute('href', `/produto/${expectedSlug}`)
    delete props.linked
  })


  it('should dispatch the correct actions if there was any', () => {
    props.actions = actions
    props.product.quantity = 1
    const { queryByText, queryByLabelText } = render(<ListedProduct {...props}/>)

    fireEvent.click(queryByLabelText(/adicionar/i))
    expect(actions.add).toHaveBeenCalledTimes(1)

    fireEvent.click(queryByLabelText(/remover uma unidade/i))
    expect(actions.subtract).toHaveBeenCalledTimes(1)

    fireEvent.click(queryByText(/remover/i))
    expect(actions.remove).toHaveBeenCalledTimes(1)
  })
  
})
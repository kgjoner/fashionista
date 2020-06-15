import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import PanelHeader from './PanelHeader'

const props = {
  title: "Sacola",
  action: jest.fn(),
  actionLabel: 'Voltar'
}


describe('PanelHeader Component', () => {
  afterEach(() => {
    cleanup()
  })


  it('should render PanelHeader component', () => {
    const { queryByLabelText, queryByText } = render(<PanelHeader {...props}/>)
    
    expect(queryByText(props.title)).toBeTruthy()
    expect(queryByLabelText(props.actionLabel)).toBeTruthy()
  })


  it('should trigger the action', () => {
    const { queryByRole } = render(<PanelHeader {...props}/>)
    const button = queryByRole('button')
    fireEvent.click(button)

    expect(props.action).toHaveBeenCalledTimes(1)
  })
  
})
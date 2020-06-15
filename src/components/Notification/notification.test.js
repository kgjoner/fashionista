import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Notification from './Notification'

const props = {
  message: 'Alerta!',
  type: "error",
  action: jest.fn(),
  actionText: 'fechar'
}


describe('Notification Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render Notification component but keep it hidden', () => {
    const { queryByRole } = render(<Notification message={props.message}/>)
    
    expect(queryByRole('alert')).toHaveClass('notification--hidden')
  })

  
  it('should show Notification component without an action', () => {
    const { queryByRole, getByText } = render(<Notification message={props.message} type={props.type}/>)
    const container = queryByRole('alert')
    
    expect(container).toBeVisible()
    expect(container).toHaveClass(`notification--${props.type}`)
    expect(getByText(props.message)).toBeTruthy()
    expect(queryByRole('button')).toBeNull()
  })

  
  it('should show Notification component with an action and trigger it when clicked', () => {
    const { queryByText } = render(<Notification {...props}/>)
    const button = queryByText(props.actionText)
    fireEvent.click(button)

    expect(props.action).toHaveBeenCalledTimes(1)
  })
  
})
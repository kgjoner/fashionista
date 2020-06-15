import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Loading from './Loading'

const props = {
  text: 'Carregando...'
}


describe('Loading Component', () => {

  it('should render Loading component', () => {
    const { getByRole, queryByText } = render(<Loading {...props} />)
    
    expect(getByRole('status').firstChild).toHaveClass('loading__icon')
    expect(queryByText(props.text)).toBeTruthy()
  })
  
})
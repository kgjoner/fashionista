import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

import Footer from './Footer'

const props = {
  text: 'Carregando...'
}


describe('Footer Component', () => {

  it('should render Footer component', () => {
    const { queryAllByRole, queryByText } = render(<Footer />)
    
    expect(queryByText(/desenvolvido por/i)).toBeTruthy()
    expect(queryAllByRole('link').length).toEqual(3)
  })
  
})
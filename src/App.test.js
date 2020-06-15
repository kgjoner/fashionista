import React from 'react';
import { renderWithStoreAndRouter, getMockStore } from './utils/testStore'
import App from './App';
import { mockProducts } from './mocks';

const store = getMockStore({ products: mockProducts})

test('renders App component', () => {
  const { queryByRole } = renderWithStoreAndRouter(<App />, store);

  expect(queryByRole('banner')).toBeInTheDocument();
  expect(queryByRole('complementary')).toBeInTheDocument();
  expect(queryByRole('main')).toBeInTheDocument();
  expect(queryByRole('contentinfo')).toBeInTheDocument();
})

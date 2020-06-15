import * as api from './api'
import { mockProducts } from '../mocks'

global.fetch = jest.fn()


describe('Api Calls', () => {

  it('should return an array of products with no name repeated', () => {
    const products = [
      ...mockProducts,
      mockProducts[0]
    ]

    fetch.mockReturnValue(
      Promise.resolve({
        ok: true,
        json: () => products
      })
    )

    const expectedProducts = [
      ...mockProducts,
      {
        ...mockProducts[0],
        name: mockProducts[0].name + ' II'
      }
    ]

    return expect(api.fetchProducts()).resolves.toEqual(expectedProducts)
  })


  it('should reject if fetch response is not ok', () => {
    fetch.mockReturnValue(
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal server error'
      })
    )

    const expectedError = new Error ({
      status: 500,
      message: 'Internal server error'
    })

    return expect(api.fetchProducts()).rejects.toEqual(expectedError)
  })
})
import * as api from './api'
// import { mockProducts } from '../mocks'
import products from '../data.json'

// global.fetch = jest.fn()


describe('Api Calls', () => {

  it('should return an array of products with no name repeated', () => {
    // const products = [
    //   ...mockProducts,
    //   mockProducts[0]
    // ]

    // fetch.mockReturnValue(
    //   Promise.resolve({
    //     ok: true,
    //     json: () => products
    //   })
    // )

    const expectedProducts = products.map((product, index) => {
      if(index === 7 || index === 11) {
        return {
          ...product,
          name: product.name + ' II'
        }
      } else {
        return product
      }
    })

    return expect(api.fetchProducts()).resolves.toEqual(expectedProducts)
  })


  // it('should reject if fetch response is not ok', () => {
  //   fetch.mockReturnValue(
  //     Promise.resolve({
  //       ok: false,
  //       status: 500,
  //       statusText: 'Internal server error'
  //     })
  //   )

  //   const expectedError = new Error ({
  //     status: 500,
  //     message: 'Internal server error'
  //   })

  //   return expect(api.fetchProducts()).rejects.toEqual(expectedError)
  // })
})
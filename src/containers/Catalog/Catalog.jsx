import React from 'react'
import { useSelector } from 'react-redux'

import ListedProduct from '../../components/ListedProduct'
import './catalog.css'

function Catalog() {
  const products = useSelector(state => state.products)

  return (
    <main className="catalog">
      <div className="catalog__group">
        <h1 className="catalog__title">Catálogo</h1>
        <span className="catalog__text">( {products.length} items )</span>
      </div>
      <ul className="catalog__list">
        {products.length && products.map((product, index) => (
          <ListedProduct key={index}
            product={product}
            linked
            columnFormat />
        ))
        }
      </ul>
    </main>
  )
}

export default Catalog
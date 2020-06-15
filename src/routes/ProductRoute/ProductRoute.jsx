import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Product from '../../containers/Product'
import { useSelector, useDispatch } from 'react-redux'
import { displayProduct, closeSidePanel } from '../../store/actions'


function ProductRoute() {
  const product = useSelector(state => state.singleProduct)
  const { productSlug } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(closeSidePanel())
    dispatch(displayProduct(productSlug))
  }, [dispatch, productSlug])

  return (
    <main>
      {product &&
        <Product product={product} single/>
      }
    </main>
  )
}

export default ProductRoute
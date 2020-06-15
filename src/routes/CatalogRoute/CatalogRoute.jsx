import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, clearSingleProduct } from '../../store/actions'

import Catalog from '../../containers/Catalog'
import Loading from '../../components/Loading'
import Footer from '../../components/Footer'


function CatalogRoute() {
  const products = useSelector(state => state.products)
  const product = useSelector(state => state.singleProduct)
  const dispatch = useDispatch()

  useEffect(() => {
    if(product) dispatch(clearSingleProduct())
    if(products.length) return
    
    dispatch(getProducts())
  }, [dispatch, products, product])

  return (
    <React.Fragment>
      {products.length
        ? <Catalog />
        : <Loading text={'Carregando catálogo...'}/>
      }
      <Footer />
    </React.Fragment>

  )
}

export default CatalogRoute
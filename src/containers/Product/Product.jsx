import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, dismissError } from '../../store/actions'

import SizeSelector from '../../components/SizeSelector/SizeSelector'
import './product.css'

function Product({ product }) {
  const [selectedSize, setSelectedSize] = useState('')
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
    if(product.sizes[0].size === 'U' && !selectedSize) {
      setSelectedSize('U')
    }
  }, [product, selectedSize])

  useEffect(() => {
    if(error?.name === 'No Size' && selectedSize) {
      dispatch(dismissError())
    }
  }, [selectedSize, error, dispatch])

  function handleAdd() {
    dispatch(addProductToCart({
      name: product.name,
      size: selectedSize,
      image: product.image,
      actual_price: product.actual_price,
      installments: product.installments
    }))
  }

  return (
    <article className="product">

      <figure className="product__image">
        <img src={product.image || `https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível`} 
          title={product.name}
          alt={`Produto ${product.name}`}/>

        {product.discount_percentage &&
          <p className="product__discount">
            -{product.discount_percentage}
          </p>
        }
      </figure>

      <div className="product__content">
        <h3 className="product__name">
          {product.name}
        </h3>
        
        <p className="product__pricing">
          {product.actual_price !== product.regular_price &&
            <span className="product__text product__text--strikethrough"
              aria-label={`de ${product.regular_price}`}>
              {product.regular_price}
            </span>
          }
          <span className="product__text"
            aria-label={`por ${product.actual_price}`}>
            {product.actual_price}
          </span>

          <span className="product__text product__text--foggy"
            aria-label={`em até ${product.installments.split('x').join('vezes de')}`}>
            em até {product.installments}
          </span>
        </p>

        <SizeSelector sizes={product.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          error={error}/>

        <button className="product__action"
          onClick={handleAdd}>
          Adicionar à Sacola
        </button>

      </div>

    </article>
  )
}

export default Product
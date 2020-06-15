import React from 'react'
import { Link } from 'react-router-dom'
import turnToSlug from '../../utils/turnToSlug'

import './listedProduct.css'

function ListedProduct({ product, actions, linked, columnFormat }) {
  return (
    <li className={`listed-product 
      ${columnFormat ? 'listed-product--column' : ''}`}>

      <figure className="product__image">
        <img src={product.image || `https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível`} 
          title={product.name}
          alt={`Produto ${product.name}`}/>

        {product.discount_percentage &&
          <p className="product__discount"
            aria-label={`${product.discount_percentage} de desconto`}>
            -{product.discount_percentage}
          </p>
        }

        {actions && actions.remove &&
          <button className="listed-product__remove"
            onClick={() => actions.remove(product.name, product.size)}
            aria-label={`Remover ${product.name} tamanho ${product.size} da sacola`}>
            Remover item
          </button>
        }
      </figure>

      <div className="listed-product__info">
        <h2 className="listed-product__name">
          {product.name}
        </h2>

        {actions &&
          <p className="product__text product__text--foggy"
            aria-label={`Tamanho: ${product.size}`}>
            Tam.: {product.size}
          </p>
        }

        {actions && actions.subtract && actions.add && product.quantity &&
          <div className="listed-product__actions">
            <button className="listed-product__action"
              onClick={() => actions.subtract(product.name, product.size)}
              aria-label={`Remover uma unidade de ${product.name} tamanho ${product.size}`}>
                <i className="fa fa-minus"></i>
            </button>
            <span className="listed-product__number">
              {product.quantity}
            </span>
            <button className="listed-product__action"
              onClick={() => actions.add(product.name, product.size)}
              aria-label={`Adicionar mais uma unidade de ${product.name} tamanho ${product.size}`}>
                <i className="fa fa-plus"></i>
            </button>
          </div>
        }
      </div>

      <p className="listed-product__pricing">
        {columnFormat && product.actual_price !== product.regular_price &&
          <span className="product__text product__text--strikethrough"
            aria-label={`de ${product.regular_price}`}>
            {product.regular_price}
          </span>
        }
        <span className="product__text"
          aria-label={`por ${product.actual_price}`}>
          {product.actual_price}
        </span>
        {!columnFormat &&
          <span className="product__text product__text--foggy"
            aria-label={`em até ${product.installments.split('x').join('vezes de')}`}>
            {product.installments}
          </span>
        }
      </p>

      
      {linked &&
        <Link className="listed-product__link" 
          to={`/produto/${turnToSlug(product.name)}`}
          aria-label={`Vá para página de ${product.name}`} />
      }

    </li>
  )
}

export default ListedProduct
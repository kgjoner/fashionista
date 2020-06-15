import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addQuantity, subtractQuantity, removeProductFromCart } from '../../store/actions'
import { countCartItems, getSubtotal } from '../../utils/computeCart'

import PanelHeader from '../../components/PanelHeader'
import ListedProduct from '../../components/ListedProduct'

import './cart.css'

function Cart({ closePanel }) {
  const shoppingCart = useSelector(state => state.shoppingCart)
  const dispatch = useDispatch()

  const actions = {
    add: (name, size) => dispatch(addQuantity({name, size})),
    subtract: (name, size) => dispatch(subtractQuantity({name, size})),
    remove: (name, size) => dispatch(removeProductFromCart({name, size}))
  }

  return (
    <React.Fragment>

      <PanelHeader title={`Sacola (${countCartItems(shoppingCart)})`}
        action={closePanel}
        actionLabel="Fechar Sacola"/>

      <ul className="side-panel__list">
        {shoppingCart.length ?
          shoppingCart.map((product, index) => {
            return (
             <ListedProduct key={index}
               product={product}
               actions={actions} />
           )
          })
          : <p className="side-panel__message">
              Sua sacola está vazia.
            </p>
        }
      </ul>

      <div className="cart__subtotal-group" 
        role="region"
        aria-labelledby="subtotal">
        <h2 className="cart__subtotal" id="subtotal">Subtotal</h2>
        <p className="cart__subtotal"> - {getSubtotal(shoppingCart)}</p>
      </div>
    
    </React.Fragment>
  )
}

export default Cart
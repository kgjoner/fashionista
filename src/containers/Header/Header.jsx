import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { openSidePanel } from '../../store/actions';
import { sidePanels } from '../../store/actionTypes';
import { countCartItems } from '../../utils/computeCart'

import logo from '../../assets/img/logo.svg'
import './header.css'

function Header() {
  const cartCounter = useSelector(state => countCartItems(state.shoppingCart))
  const dispatch = useDispatch()

  function handleAction(sidePanel) {
    dispatch(openSidePanel(sidePanel))
  }

  return (
    <header className="header" role="banner">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logotipo"/>
        </Link>

        <div className="header__actions">
          
          <button className="header__action"
            aria-label="Procurar produto na loja"
            onClick={() => handleAction(sidePanels.SEARCH)}>
            <i className="fa fa-search"></i>
          </button>
          
          <button className="header__action" 
            aria-label="Abrir sacola de compras"
            onClick={() => handleAction(sidePanels.CART)}>
            <i className="fa fa-shopping-cart"></i>
            <sup className="header__sup">
              <span className="header__counter">{cartCounter}</span>
            </sup>
          </button>

        </div>     
      </div>
    </header>
  )
}

export default Header
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import PanelHeader from '../../components/PanelHeader'
import ListedProduct from '../../components/ListedProduct'

import './searchPanel.css'

function SearchPanel({ closePanel }) {
  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const products = useSelector(state => state.products)
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
  }, [inputEl])

  function filterProducts(value) {
    setQuery(value)

    if(value.length === 0) {
      setFilteredProducts([])
      return
    } else if (value.length < 3) {
      return
    }

    const filteredProducts = products.filter(product => {
      return product.name.toLowerCase().includes(value.toLowerCase())
    })

    setFilteredProducts(filteredProducts)
  }

  return (
    <React.Fragment>

      <PanelHeader title="Busca"
        action={closePanel}
        actionLabel="Fechar Busca"/>

      <form className="search-panel__group"
        role="search">
        <input type="search" ref={inputEl}
          className="search-panel__field"
          placeholder="Buscar por produto..."
          aria-label="Busca por produto"
          value={query}
          onChange={e => filterProducts(e.target.value)} />
      </form>

      <ul className="side-panel__list">
        {filteredProducts.length ?
          filteredProducts.map((product, index) => (
            <ListedProduct key={index}
              product={product}
              linked />
          ))
          : <p className="side-panel__message">
              Nenhum item encontrado :\
            </p>
        }
      </ul>

    </React.Fragment>
  )
}

export default SearchPanel
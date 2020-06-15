import React from 'react'

import './sizeSelector.css'


function SizeSelector({ sizes, selectedSize, setSelectedSize, error }) {
  return (
    <form className={`size-selector 
      ${error?.name === 'No Size' ? 'size-selector--error' : ''}`}
      aria-labelledby="size-selector__title">

      <fieldset className="size-selector__container">

        <legend className="size-selector__title" id="size-selector__title">
          Escolha o tamanho
        </legend>

        <div className="size-selector__group" role="radiogroup">
          {sizes.map((size, index) => {
            if(!size.available) return null
            
            return (
              <label key={index}
                className={`size-selector__interactor
                ${selectedSize === size.size ? 'size-selector__interactor--checked' : ''}`}>

                <input type="radio" name="size" 
                  value={size.size}
                  checked={selectedSize === size.size}
                  onChange={() => setSelectedSize(size.size)}
                  className="size-selector__radio"/>

                {size.size}
              </label>
            )
          })}
        </div>

      </fieldset>
    </form>
  )
}

export default SizeSelector
import React from 'react'

import './loading.css'

function Loading({ text }) {
  return (
    <p className="loading" role="status">
      <i className="fa fa-circle-o-notch loading__icon"
        aria-hidden="true"></i>

      {text &&
        <span className="loading__text">{ text }</span>}
    </p>
  )
}

export default Loading
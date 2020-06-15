import React from 'react'

import './panelHeader.css'

function PanelHeader({ title, action, actionLabel }) {
  return (
    <header className="panel-header">

      <button className="header__action"
        aria-label={actionLabel}
        onClick={action}>
          <i className="fa fa-arrow-left"></i>
      </button>

      <h1 className="panel-header__title">
        {title}
      </h1>

    </header>
  )
}

export default PanelHeader
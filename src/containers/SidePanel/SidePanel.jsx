import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeSidePanel } from '../../store/actions'
import { sidePanels } from '../../store/actionTypes'

import Cart from '../Cart'
import SearchPanel from '../SearchPanel'
import './sidePanel.css'


function SidePanel() {
  const sidePanel = useSelector(state => state.sidePanel)
  const [putback, setPutback] = useState(false)
  const dispatch = useDispatch()

  function close() {
    setPutback(true)
    setTimeout(() => {
      dispatch(closeSidePanel())
      setPutback(false)
    }, 600)
  }

  function handleClick(e) {
    if(!e || e.target === document.querySelector('.side-panel__bg')) {
      close()
    }
  }

  return (
    <React.Fragment>

      {sidePanel !== sidePanels.NONE &&
        <div className={`side-panel__bg 
          ${putback ? 'side-panel__bg--putback' : ''}`}
          onMouseDown={e => handleClick(e)}
          role="presentation">
        </div>
      }

      <aside className={`side-panel 
        ${sidePanel !== sidePanels.NONE ? 'side-panel--draw' : ''}
        ${putback ? 'side-panel--putback' : ''}`}>
          
        { sidePanel === sidePanels.SEARCH &&
          <SearchPanel closePanel={close} />
        }
        { sidePanel === sidePanels.CART &&
          <Cart closePanel={close} />
        }
      </aside>

    </React.Fragment>
  )
}

export default SidePanel
import React from 'react'
import './notification.css'

function Notification({ message, type, action, actionText }) {
  return (
    <div className={`notification 
      ${type ? `notification--${type}` : 'notification--hidden'}`}
      role="alert">

      <p className="notification__message">
        {message}
      </p>
      
      { action 
        ? <button className="notification__btn"
            onClick={action}> 
            {actionText} 
          </button>
        : null
      }
    </div> 
  )
}

export default Notification
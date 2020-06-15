import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dismissError, dismissSuccess } from '../../store/actions'

import Notification from '../../components/Notification'
import './toaster.css'


function Toaster() {
  const [notification, setNotification] = useState(null)
  const [toast, setToast] = useState(false)
  const success = useSelector(state => state.success)
  const error = useSelector(state => state.error)
  const timeout = useRef(null)
  const dispatch = useDispatch()

  const closeToaster = useCallback(() => {
    if(success) {      
      dispatch(dismissSuccess())
    } else {
      dispatch(dismissError())
    }
  }, [success, dispatch])


  useEffect(() => {
    if(success || error) {
      clearTimeout(timeout.current)
      setNotification({
        type: success ? 'success' : 'error',
        message: success || error?.message
      })
      setToast(true)
    } else {
      setToast(false)
      timeout.current = setTimeout(() => {
        setNotification(null)
      }, 600)
    }

    if(success) {
      setTimeout(() => closeToaster(), 2000)
    }
  }, [success, error, closeToaster])

  return (
    <section className={`toaster ${!notification ? 'toaster--hidden' : ''}`}>
      <div className={`toaster__container 
      ${toast ? 'toaster__container--toast' : ''}`}
      role="presentation">

      {notification &&
        <Notification type={notification.type}
          message={notification.message}
          action={closeToaster}
          actionText="fechar"
        />
      }

      </div> 
    </section>
  )
}

export default Toaster
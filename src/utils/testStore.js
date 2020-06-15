import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { initialState, reducer } from '../store/reducer';

const mockStore = configureStore([thunk])


export function getMockStore(getState = {}) {
  if(typeof getState === 'function') {
    return mockStore(getState)
  } else {
    return mockStore({
      ...initialState,
      ...getState
    })
  }  
}

export function runActionsOnReducer(actions, state) {
  actions.forEach(action => {
    state = reducer(state, action)
  })
  return state
}

export function renderWithStoreAndRouter(component, store) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

export function rerenderWithStoreAndRouter(rerender, component, store) {
  return rerender(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
} 
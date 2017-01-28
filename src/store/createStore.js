import { applyMiddleware, compose, createStore } from 'redux'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, routerMiddleware(browserHistory)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [
    applyMiddleware(...middleware)
  ]

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

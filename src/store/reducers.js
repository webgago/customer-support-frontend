import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'
import authReducer from '../containers/Auth/reducer'
import { routerReducer } from 'react-router-redux'
import { reducer as notifications } from 'react-notification-system-redux'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    auth: authReducer,
    notifications,
    form,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

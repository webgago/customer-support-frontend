/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable'
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from './constants'

let user = localStorage.getItem('user')
user = user ? JSON.parse(user) : null

export const initialState = fromJS({
  processing: {
    login: false
  },
  user,
  userToken: localStorage.getItem('userToken') || null
})

function authReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state
        .setIn(['processing', 'login'], true)
    case LOGIN_SUCCESS:
      return state
        .setIn(['processing', 'login'], false)
        .set('user', fromJS(action.payload.user))
        .set('userToken', action.payload.token)
    case LOGIN_FAILED:
      return state
        .setIn(['processing', 'login'], false)
    case LOGOUT:
      return state
        .set('user', null)
        .set('userToken', null)
    default:
      return state
  }
}

export default authReducer

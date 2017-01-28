import * as api from '../../services/api'
import { selectNextPathname } from '../../containers/App/selectors'
import { push } from 'react-router-redux'

/*
 *
 * Auth actions
 *
 */

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  UNAUTHORIZED
} from './constants'

export function requestLogin (email, password, meta) {
  return {
    type: LOGIN,
    payload: {
      auth: {
        email,
        password
      }
    },
    meta
  }
}

export function login (email, password, meta) {
  return (dispatch, getState) => {
    dispatch(requestLogin(email, password, meta))

    return api.login({ email, password })
      .then(({ token, user }) => {
        dispatch(loginSuccess(token, user))
        const nextPathname = selectNextPathname()(getState())
        dispatch(push(nextPathname || '/'))

        meta.resolve(user)
      })
      .catch(({ errors, response }) => {
        dispatch(loginFailed(errors))
        meta.reject(errors)
      })
  }
}

export function loginSuccess (token, user) {
  localStorage.setItem('userToken', token)
  localStorage.setItem('user', JSON.stringify(user))

  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      user
    }
  }
}

export function loginFailed (errors) {
  localStorage.removeItem('userToken')
  localStorage.removeItem('user')

  return {
    type: LOGIN_FAILED,
    payload: {
      errors
    }
  }
}

export function logout (nextPathname) {
  localStorage.removeItem('userToken')
  localStorage.removeItem('user')
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: {
        nextPathname
      }
    })
    dispatch(push('/'))
  }
}

export function unauthorized () {
  return {
    type: UNAUTHORIZED
  }
}

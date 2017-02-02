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

export function login (email, password, { resolve, reject }) {
  return (dispatch, getState) => {
    dispatch(requestLogin(email, password, { resolve, reject }))

    return api.login({ email, password })
      .then(({ token, user }) => {
        dispatch(loginSuccess(token, user))
        const nextPathname = selectNextPathname()(getState())
        dispatch(push(nextPathname || '/'))

        if (resolve) resolve(user)
      })
      .catch(({ errors, response }) => {
        dispatch(loginFailed(errors))
        if (reject) reject({ errors })
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

export function unauthorized (nextPathname) {
  return (dispatch) => {
    dispatch(logout(nextPathname))
    dispatch({ type: UNAUTHORIZED })
  }
}

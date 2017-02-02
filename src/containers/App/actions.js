import * as api from '../../services/api'
import { selectNextPathname } from '../../containers/App/selectors'
import { push } from 'react-router-redux'

/*
 *
 * App actions
 *
 */

import {
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED
} from './constants'

export function requestSignup (firstName, lastName, email, password, meta) {
  return {
    type: SIGNUP,
    payload: {
      firstName,
      lastName,
      email,
      password
    },
    meta
  }
}

export function signup (firstName, lastName, email, password, meta) {
  return (dispatch, getState) => {
    dispatch(requestSignup(firstName, lastName, email, password, meta))

    return api.signup({ firstName, lastName, email, password })
      .then(() => {
        dispatch(signupSuccess({ firstName, lastName, email, password }))
        const nextPathname = selectNextPathname()(getState())
        dispatch(push(nextPathname || '/'))
        meta.resolve({ firstName, lastName, email, password })
      })
      .catch(({ errors }) => {
        dispatch(signupFailed(errors))
        meta.reject({ errors })
      })
  }
}

export function signupSuccess (user) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      user
    }
  }
}

export function signupFailed (errors) {
  return {
    type: SIGNUP_FAILED,
    payload: {
      errors
    }
  }
}

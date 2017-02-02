import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux'
import { unauthorized } from 'containers/Auth/actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST'
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS'
export const LOAD_USERS_FAILURE = 'LOAD_USERS_FAILURE'

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const loadUsers = (params = {}) => {
  return (dispatch) => {
    dispatch(loadUsersRequest())

    return api.searchUsers(params)
      .then((users) => {
        dispatch(loadUsersSuccess(users))
      })
      .catch((error) => {
        /* istanbul ignore next */
        if (error instanceof Error) throw error
        /* istanbul ignore next */
        if (error.unauthorized) dispatch(unauthorized())
        dispatch(loadUsersFailure(error))
        dispatch(Notifications.error({ title: error.errors._error }))
      })
  }
}

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch(deleteUserRequest())

    return api.deleteUser(id)
      .then(() => {
        dispatch(deleteUserSuccess(id))
      })
      .catch((error) => {
        /* istanbul ignore next */
        if (error instanceof Error) throw error
        /* istanbul ignore next */
        if (error.unauthorized) dispatch(unauthorized())
        dispatch(deleteUserFailure(error))
        dispatch(Notifications.error({ title: error.errors._error }))
      })
  }
}

export const deleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST
  }
}

export const deleteUserSuccess = (id) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: id
  }
}

export const deleteUserFailure = (error) => {
  return {
    type: DELETE_USER_FAILURE,
    error
  }
}

export const loadUsersRequest = () => {
  return {
    type: LOAD_USERS_REQUEST
  }
}

export const loadUsersSuccess = (users) => {
  return {
    type: LOAD_USERS_SUCCESS,
    payload: users
  }
}

export const loadUsersFailure = (error) => {
  return {
    type: LOAD_USERS_FAILURE,
    error
  }
}

export const actions = {
  loadUsers,
  loadUsersRequest,
  loadUsersSuccess,
  loadUsersFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_USERS_SUCCESS]: (state, action) => action.payload,
  [DELETE_USER_SUCCESS]: (state, action) => state.filter((user) => user.id !== action.payload)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default function usersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

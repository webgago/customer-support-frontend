import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux'
import { unauthorized } from 'containers/Auth/actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TICKETS_REQUEST = 'LOAD_TICKETS_REQUEST'
export const LOAD_TICKETS_SUCCESS = 'LOAD_TICKETS_SUCCESS'
export const LOAD_TICKETS_FAILURE = 'LOAD_TICKETS_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export const loadTickets = (params = {}) => {
  return (dispatch) => {
    dispatch(loadTicketsRequest())

    return api.searchTickets(params)
      .then((tickets) => {
        dispatch(loadTicketsSuccess(tickets))
      })
      .catch((error) => {
        /* istanbul ignore next */
        if (error.unauthorized) dispatch(unauthorized())
        dispatch(loadTicketsFailure(error))
        dispatch(Notifications.error({ title: error.errors.base[0] }))
      })
  }
}

export const loadTicketsRequest = () => {
  return {
    type: LOAD_TICKETS_REQUEST
  }
}

export const loadTicketsSuccess = (tickets) => {
  return {
    type: LOAD_TICKETS_SUCCESS,
    payload: tickets
  }
}

export const loadTicketsFailure = (error) => {
  return {
    type: LOAD_TICKETS_FAILURE,
    error
  }
}

export const actions = {
  loadTickets,
  loadTicketsRequest,
  loadTicketsSuccess,
  loadTicketsFailure
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TICKETS_SUCCESS]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default function ticketsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux'
import { push } from 'react-router-redux'
import { unauthorized } from 'containers/Auth/actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TICKET_REQUEST = 'LOAD_TICKET_REQUEST'
export const LOAD_TICKET_SUCCESS = 'LOAD_TICKET_SUCCESS'
export const LOAD_TICKET_FAILURE = 'LOAD_TICKET_FAILURE'

const catchError = dispatch => (error) => {
  /* istanbul ignore next */
  if (error instanceof Error) throw error
  /* istanbul ignore next */
  if (error.unauthorized) dispatch(unauthorized())
  dispatch(loadTicketFailure(error))
  dispatch(Notifications.error({ title: error.errors._error }))
  dispatch(push('/tickets'))
}

// ------------------------------------
// Actions
// ------------------------------------
export const loadTicket = (id) => {
  return (dispatch) => {
    dispatch(loadTicketRequest())

    return api.ticket(id)
      .then((ticket) => {
        dispatch(loadTicketSuccess(ticket))
      })
      .catch(catchError(dispatch))
  }
}

export const reopenTicket = (id) => {
  return (dispatch) => {
    dispatch(loadTicketRequest())

    return api.reopenTicket(id)
      .then((ticket) => {
        dispatch(loadTicketSuccess(ticket))
      })
      .catch(catchError(dispatch))
  }
}

export const closeTicket = (id) => {
  return (dispatch) => {
    dispatch(loadTicketRequest())

    return api.closeTicket(id)
      .then((ticket) => {
        dispatch(loadTicketSuccess(ticket))
      })
      .catch(catchError(dispatch))
  }
}

export const loadTicketRequest = () => {
  return {
    type: LOAD_TICKET_REQUEST
  }
}

export const loadTicketFailure = (error) => {
  return {
    type: LOAD_TICKET_FAILURE,
    error
  }
}

export const loadTicketSuccess = (ticket) => {
  return {
    type: LOAD_TICKET_SUCCESS,
    payload: ticket
  }
}

export const actions = {
  loadTicket,
  loadTicketSuccess,
  loadTicketRequest,
  loadTicketFailure,
  reopenTicket,
  closeTicket
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TICKET_SUCCESS]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { user: {} }
export default function ticketReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

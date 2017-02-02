import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux'
import { unauthorized } from 'containers/Auth/actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TICKETS_REQUEST = 'LOAD_TICKETS_REQUEST'
export const LOAD_TICKETS_SUCCESS = 'LOAD_TICKETS_SUCCESS'
export const LOAD_TICKETS_FAILURE = 'LOAD_TICKETS_FAILURE'

export const DELETE_TICKET_REQUEST = 'DELETE_TICKET_REQUEST'
export const DELETE_TICKET_SUCCESS = 'DELETE_TICKET_SUCCESS'
export const DELETE_TICKET_FAILURE = 'DELETE_TICKET_FAILURE'

export const ADD_TICKET = 'ADD_TICKET'

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
        if (error instanceof Error) throw error
        /* istanbul ignore next */
        if (error.unauthorized) dispatch(unauthorized())
        dispatch(loadTicketsFailure(error))
        dispatch(Notifications.error({ title: error.errors._error }))
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

export const deleteTicket = (id) => {
  return (dispatch) => {
    dispatch(deleteTicketRequest())

    return api.deleteTicket(id)
      .then(() => {
        dispatch(deleteTicketSuccess(id))
      })
      .catch((error) => {
        /* istanbul ignore next */
        if (error instanceof Error) throw error
        /* istanbul ignore next */
        if (error.unauthorized) dispatch(unauthorized())
        dispatch(deleteTicketFailure(error))
        dispatch(Notifications.error({ title: error.errors._error }))
      })
  }
}

export const deleteTicketRequest = () => {
  return {
    type: DELETE_TICKET_REQUEST
  }
}

export const deleteTicketSuccess = (id) => {
  return {
    type: DELETE_TICKET_SUCCESS,
    payload: id
  }
}

export const deleteTicketFailure = (error) => {
  return {
    type: DELETE_TICKET_FAILURE,
    error
  }
}

export const addTicket = (ticket) => {
  return {
    type: ADD_TICKET,
    payload: ticket
  }
}

export const actions = {
  loadTickets,
  loadTicketsRequest,
  loadTicketsSuccess,
  loadTicketsFailure,
  deleteTicket,
  deleteTicketRequest,
  deleteTicketFailure,
  deleteTicketSuccess,
  addTicket
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TICKETS_SUCCESS]: (state, action) => action.payload,
  [DELETE_TICKET_SUCCESS]: (state, action) => state.filter((ticket) => ticket.id !== action.payload),
  [ADD_TICKET]: (state, action) => [action.payload, ...state]
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default function ticketsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

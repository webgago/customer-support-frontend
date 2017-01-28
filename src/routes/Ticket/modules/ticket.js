import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux';
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TICKET_SUCCESS = 'LOAD_TICKET_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const loadTicket = (id) => {
  return (dispatch) => {
    return api.ticket(id)
      .then((ticket) => {
        dispatch(loadTicketSuccess(ticket))
      })
      .catch((error) => {
        if (error instanceof Error) throw error
        else {
          dispatch(Notifications.error({title: error.errors.base[0]}))
          dispatch(push('/tickets'))
        }
      })
  }
}

export const reopenTicket = (ticket) => {
  return (dispatch) => {
    return api.reopenTicket(ticket.id)
      .then((ticket) => {
        dispatch(loadTicketSuccess(ticket))
      })
      .catch((error) => {
        if (error instanceof Error) throw error
        else {
          dispatch(Notifications.error({title: error.errors.base[0]}))
          dispatch(push('/tickets'))
        }
      })
  }
}

export const closeTicket = (ticket) => {
  return (dispatch) => {
    return api.closeTicket(ticket.id)
      .then((ticket) => {
        dispatch(loadTicketSuccess(ticket))
      })
      .catch((error) => {
        if (error instanceof Error) throw error
        else {
          dispatch(Notifications.error({title: error.errors.base[0]}))
          dispatch(push('/tickets'))
        }
      })
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
  reopenTicket,
  closeTicket,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TICKET_SUCCESS]: (state, action) => action.payload,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {user: {}}
export default function ticketReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

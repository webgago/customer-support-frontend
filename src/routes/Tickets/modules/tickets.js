import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TICKETS_SUCCESS = 'LOAD_TICKETS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export const loadTickets = (params) => {
  return (dispatch) => {
    return api.searchTickets(params)
      .then((tickets) => {
        dispatch(loadTicketsSuccess(tickets))
      })
      .catch((error) => {
        if (error instanceof Error) throw error
        dispatch(Notifications.error({ title: error.errors.base[0] }))
      })
  }
}
export const loadTicketsSuccess = (tickets) => {
  return {
    type: LOAD_TICKETS_SUCCESS,
    payload: tickets
  }
}

export const actions = {
  loadTickets,
  loadTicketsSuccess
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

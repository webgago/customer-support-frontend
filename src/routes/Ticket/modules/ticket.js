import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux';
import { unauthorized } from '../../../containers/Auth/actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_TICKET = 'LOAD_TICKET'

// ------------------------------------
// Actions
// ------------------------------------
export const loadTicket = (id) => {
  return (dispatch) => {
    return api.ticket(id)
      .then((ticket) => {
        dispatch({
          type: LOAD_TICKET,
          payload: ticket
        })
      })
      .catch((error) => {
        if (error instanceof Error) throw error
        else dispatch(Notifications.error({title: error.errors.base[0]}))
      })
  }
}

export const actions = {
  loadTicket
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_TICKET]: (state, action) => action.payload,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {user: {}}
export default function ticketReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

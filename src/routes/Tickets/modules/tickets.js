import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = []) {
  return {
    type: COUNTER_INCREMENT,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const loadTickets = () => {
  return (dispatch) => {
    return api.tickets()
      .then((tickets) => {
        dispatch({
          type: COUNTER_DOUBLE_ASYNC,
          payload: tickets
        })
      })
      .catch((error) => {
        if (error instanceof Error) throw error
        dispatch(Notifications.error({title: error.errors.base[0]}))
      })
  }
}

export const actions = {
  increment,
  loadTickets
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => action.payload,
  [COUNTER_DOUBLE_ASYNC]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function ticketsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

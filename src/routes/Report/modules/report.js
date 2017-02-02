import * as api from '../../../services/api'
import Notifications from 'react-notification-system-redux'
import { unauthorized } from 'containers/Auth/actions'

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_REPORT_SUCCESS = 'LOAD_REPORT_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export const loadReport = () => {
  return (dispatch) => {
    return api.loadReport()
      .then((report) => {
        dispatch(loadReportSuccess(report))
      })
      .catch((error) => {
        if (error.unauthorized) dispatch(unauthorized())
        if (error instanceof Error) throw error
        dispatch(Notifications.error({ title: error.errors._error }))
      })
  }
}
export const loadReportSuccess = (report) => {
  return {
    type: LOAD_REPORT_SUCCESS,
    payload: report
  }
}

export const actions = {
  loadReport,
  loadReportSuccess
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOAD_REPORT_SUCCESS]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { data: [] }
export default function reportReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

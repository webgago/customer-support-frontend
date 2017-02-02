import { SubmissionError, reset } from 'redux-form'
import * as api from '../../services/api'
import { loadTicketSuccess } from '../../routes/Ticket/modules/ticket'
import { goBack } from 'react-router-redux'

function submit (values, ticket, dispatch) {
  return api.replyToTicket(ticket.id, values.toJS())
    .then((ticket) => {
      dispatch(loadTicketSuccess(ticket))
      dispatch(reset('replyForm'))
      if (ticket.closed) {
        dispatch(goBack())
      }
    })
    .catch(({ errors }) => {
      if (errors) {
        throw new SubmissionError({ ...errors })
      }
    })
}

export default submit

import { SubmissionError, reset } from 'redux-form'
import * as api from '../../services/api'
import { addTicket } from '../../routes/Tickets/modules/tickets'
import Notifications from 'react-notification-system-redux'

function submit (values, dispatch) {
  return api.createTicket(values.toJS())
    .then((ticket) => {
      dispatch(addTicket(ticket))
      dispatch(reset('ticketForm'))
      dispatch(Notifications.success({ title: `Ticket "${ticket.title}" submitted!` }))
    })
    .catch(({ errors }) => {
      if (errors) {
        throw new SubmissionError({ ...errors })
      }
    })
}

export default submit

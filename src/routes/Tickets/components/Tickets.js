import React from 'react'
import { Link } from 'react-router'
import { FormattedRelative } from 'react-intl'
import TicketsSearchForm from '../../../components/TicketsSearchForm'
import './Tickets.scss'

export const Ticket = ({ ticket, deleteTicket, isAdmin }) => {
  const destroy = id => () => deleteTicket(id)

  const status = () => {
    if (ticket.new) {
      return 'label label-warning'
    } else if (ticket.closed) {
      return 'label label-success'
    }
    return 'label label-default'
  }
  return (
    <tr key={ticket.id}>
      <td>
        <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
      </td>
      <td>
        <span className={status()}>{ticket.status}</span>
      </td>
      <td>
        <FormattedRelative value={ticket.updated_at} />
      </td>
      <td>
        {ticket.user.full_name}
      </td>
      {isAdmin && <td>
        <button className='btn btn-danger' onClick={destroy(ticket.id)}>Delete</button>
      </td>}
    </tr>
  )
}

Ticket.propTypes = {
  ticket: React.PropTypes.object.isRequired,
  deleteTicket: React.PropTypes.func.isRequired,
  isAdmin: React.PropTypes.bool.isRequired
}

export class Tickets extends React.Component {
  static propTypes = {
    tickets: React.PropTypes.array.isRequired,
    loadTickets: React.PropTypes.func.isRequired,
    deleteTicket: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
  }

  isAdmin () {
    return this.props.currentUser.role === 'admin'
  }

  componentDidMount () {
    this.props.loadTickets()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.query !== this.props.location.query) {
      this.props.loadTickets(nextProps.location.query)
    }
  }

  render () {
    let { tickets, deleteTicket } = this.props
    let q = this.props.location.query.q

    return (
      <div className='tickets'>
        <TicketsSearchForm />
        {tickets.length !== 0 && <div>
          <h2>
            Tickets
            <small className='pull-right'>
              <a href='/report' className='btn btn-sm btn-default'>Print</a>
            </small>
          </h2>
          <table className='table table-bordered'>
            <thead>
              <tr className='active'>
                <td>Title</td>
                <td>Status</td>
                <td>Updated at</td>
                <td>Author</td>
                {this.isAdmin() && <td>Actions</td>}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (Ticket({ ticket, deleteTicket, isAdmin: this.isAdmin() })))}
            </tbody>
          </table>
        </div>}
        {tickets.length === 0 && <div className='jumbotron'>
          {q && <p className='text-center'>
            {`We couldn’t find any tickets matching '${q}'`}
          </p>}
          {!q && <p className='text-center'>
            No tickets yet
          </p>}
        </div>}
      </div>
    )
  }
}

export default Tickets

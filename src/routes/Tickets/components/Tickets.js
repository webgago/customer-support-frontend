import React from 'react'
import { Link } from 'react-router'
import { FormattedRelative } from 'react-intl'

const Ticket = ({ticket}) => {
  return (
    <tr key={ticket.id}>
      <td>
        <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
      </td>
      <td>
        <FormattedRelative value={ticket.updated_at}/>
      </td>
      <td>
        {`${ticket.user.full_name}`}
      </td>
    </tr>
  )
}

export class Tickets extends React.Component {
  static propTypes = {
    tickets: React.PropTypes.array.isRequired,
    loadTickets: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadTickets();
  }

  render() {
    let { tickets } = this.props;

    return (
      <div style={{margin: '0 auto'}}>
        <h2>Tickets</h2>
        <table className="table table-bordered">
          <thead>
          <tr className="active">
            <td>Title</td>
            <td>Updated at</td>
            <td>Author</td>
          </tr>
          </thead>
          <tbody>
          {tickets.map((ticket) => (Ticket({ticket})))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Tickets

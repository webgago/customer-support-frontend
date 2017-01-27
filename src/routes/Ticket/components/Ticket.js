import React from 'react'
import './Ticket.scss'
import { FormattedDate } from 'react-intl'

export class Ticket extends React.Component {
  static propTypes = {
    ticket: React.PropTypes.object.isRequired,
    loadTicket: React.PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadTicket(this.props.params.id);
  }

  render() {
    let { ticket } = this.props;
    let dateFormat = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric"
    }
    return (
      <div className="ticket">
        <div className="ticket__title">
          <h2>{ticket.title} <small>#{ticket.id}</small></h2>
        </div>
        <div className="ticket__content markdown-body">
          <blockquote>
            {ticket.body}
            <footer>
              <cite title={ticket.user.full_name}>{ticket.user.full_name}</cite>
              {ticket.created_at && <time><FormattedDate value={ticket.created_at} {...dateFormat}/></time>}
            </footer>
          </blockquote>
          <div className="add-reply">
            <form>
              <div className="form-group">
                <textarea className="form-control" rows="5"/>
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Ticket

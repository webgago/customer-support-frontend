import React from 'react'
import './Ticket.scss'
import { FormattedDate, FormattedRelative } from 'react-intl'
import ReplyForm from '../../../components/ReplyForm'

export const Reply = ({ reply }) => {
  return (
    <div className={`reply reply-${reply.author.role}`} key={reply.id}>
      <div className='reply__avatar'>
        <div className='reply__avatar-placeholder'>{reply.author.first_name[0]}.{reply.author.last_name[0]}</div>
      </div>
      <div className='reply__title'>
        {reply.author.full_name}
        <div className='pull-right'>
          <FormattedRelative value={reply.updated_at} />
        </div>
      </div>
      <div className='reply__content'>
        {reply.body}
      </div>
    </div>
  )
}

Reply.propTypes = {
  reply: React.PropTypes.object.isRequired
}

export class Ticket extends React.Component {
  static propTypes = {
    ticket: React.PropTypes.object.isRequired,
    loadTicket: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.loadTicket(this.props.params.id)
  }

  canReopen () {
    return this.props.ticket.closed && this.props.currentUser.role !== 'customer'
  }

  canClose () {
    return this.props.currentUser.role !== 'customer'
  }

  hasReplies () {
    return this.props.ticket.replies && this.props.ticket.replies.length > 0
  }

  status (ticket) {
    if (ticket.new) {
      return 'label label-warning'
    } else if (ticket.closed) {
      return 'label label-success'
    }
    return 'label label-default'
  }

  render () {
    let { ticket } = this.props
    let dateFormat = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric'
    }
    return (
      <div className='ticket'>
        <div className='ticket__title'>
          <h2>
            {ticket.title}
            <small>#{ticket.id} <span className={`pull-right ${this.status(ticket)}`}>{ticket.status}</span></small>
          </h2>
        </div>
        <div className='ticket__content'>
          <blockquote>
            {ticket.body}
            <footer>
              <cite title={ticket.user.full_name}>{ticket.user.full_name}</cite>
              {ticket.created_at && <time><FormattedDate value={ticket.created_at} {...dateFormat} /></time>}
            </footer>
          </blockquote>
          {this.hasReplies() && <div className='replies'>
            {ticket.replies.map((reply) => (Reply({ reply })))}
          </div>}
          {!ticket.closed && <div className='add-reply'>
            <ReplyForm ticket={ticket} close={this.canClose()} />
          </div>}
          {this.canReopen() && <div className='add-reply'>
            <ReplyForm ticket={ticket} reopen />
          </div>}
        </div>
      </div>
    )
  }
}

export default Ticket

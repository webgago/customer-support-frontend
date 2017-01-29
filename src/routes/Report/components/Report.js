import React from 'react'
import { FormattedDate, FormattedRelative } from 'react-intl'
import './Report.scss'

const Ticket = ({ ticket }) => {
  const cleanUp = message => <span>{message.replace(' ago', '').replace('in ', '')}</span>

  return (
    <tr key={ticket.id}>
      <td>
        {ticket.title}
      </td>
      <td>
        <FormattedDate value={ticket.closed_at} />
      </td>
      <td>
        <FormattedRelative value={ticket.closed_at}
          valueFrom={ticket.created_at} units={'day'} style={'numeric'} children={cleanUp} />
      </td>
      <td>
        {ticket.author}
      </td>
    </tr>
  )
}

Ticket.propTypes = {
  ticket: React.PropTypes.object.isRequired
}

export class Report extends React.Component {
  static propTypes = {
    report: React.PropTypes.object.isRequired,
    loadReport: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.loadReport()
  }

  render () {
    let { report } = this.props
    let q = this.props.location.query.q

    return (
      <div className='tickets'>
        {report.data.length !== 0 && <div>
          <h2>
            Report: Tickets closed in the last one month
            <small className='pull-right no-print'>
              <a onClick={print} className='btn btn-sm btn-default'>Print</a>
            </small>
          </h2>
          <table className='table table-bordered'>
            <thead>
              <tr className='active'>
                <td>Title</td>
                <td>Closed On</td>
                <td>Lifetime</td>
                <td>Author</td>
              </tr>
            </thead>
            <tbody>
              {report.data.map((ticket) => (Ticket({ ticket })))}
            </tbody>
          </table>
        </div>}
        {report.data.length === 0 && <div className='jumbotron'>
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

export default Report

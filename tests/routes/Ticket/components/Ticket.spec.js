import React from 'react'
import { Ticket } from 'routes/Ticket/components/Ticket'
import ReplyForm from 'components/ReplyForm'

import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'

describe('(Component) Ticket', () => {
  let _props, _spies, _wrapper, ticket

  beforeEach(() => {
    _spies = {}
    ticket = { id: 1, created_at: new Date(), closed: false, status: 'new', user: { full_name: 'Mr. Anderson' } }
    _props = {
      ticket: ticket,
      currentUser: ticket.user,
      params: { id: 1 },
      ...bindActionCreators({
        loadTicket: (_spies.loadTicket = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Ticket {..._props} />)
  })

  it('Renders a div with class ticket', () => {
    expect(_wrapper.is('div.ticket')).to.equal(true)
  })

  it('Renders ReplyForm', () => {
    expect(_wrapper.find('.ticket__content').containsAllMatchingElements([<ReplyForm />])).to.equal(true)
  })
})

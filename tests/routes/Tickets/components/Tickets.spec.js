import React from 'react'
import { bindActionCreators } from 'redux'
import { Tickets } from 'routes/Tickets/components/Tickets'
import TicketsSearchForm from 'components/TicketsSearchForm'
import { shallow } from 'enzyme'

describe('(Component) Tickets', () => {
  let _props, _spies, _wrapper, ticket

  describe('without tickets', () => {
    beforeEach(() => {
      _spies = {}
      _props = {
        tickets: [],
        currentUser: { role: 'admin' },
        location: { query: { q: '' } },
        ...bindActionCreators({
          loadTickets: (_spies.loadTickets = sinon.spy()),
          deleteTicket: (_spies.loadTickets = sinon.spy())
        }, _spies.dispatch = sinon.spy())
      }
      _wrapper = shallow(<Tickets {..._props} />)
    })

    it('Should render as a div with class tickets.', () => {
      expect(_wrapper.is('div.tickets')).to.equal(true)
    })

    it('Should render text `No tickets yet`.', () => {
      expect(_wrapper.find('.jumbotron').text()).to.match(/No tickets yet/)
    })

    it('Should render TicketsSearchForm', () => {
      expect(_wrapper.contains(<TicketsSearchForm />)).to.equal(true)
    })
  })

  describe('with tickets', () => {
    beforeEach(() => {
      _spies = {}
      ticket = {
        id: 1, updated_at: new Date(), status: 'new', user: { full_name: 'Mr. Anderson' }
      }
      _props = {
        tickets: [ticket],
        currentUser: { role: 'admin' },
        location: { query: { q: '' } },
        ...bindActionCreators({
          loadTickets: (_spies.loadTickets = sinon.spy()),
          deleteTicket: (_spies.loadTickets = sinon.spy())
        }, _spies.dispatch = sinon.spy())
      }
      _wrapper = shallow(<Tickets {..._props} />)
    })

    it('Should render as a div with class tickets.', () => {
      expect(_wrapper.is('div.tickets')).to.equal(true)
    })

    it('Should render TicketsSearchForm', () => {
      expect(_wrapper.find(TicketsSearchForm)).to.have.length(1)
    })

    it('Should render with an <h2>.', () => {
      expect(_wrapper.find('h2').text()).to.match(/Tickets/)
    })

    it('Should render with an <thead>.', () => {
      expect(_wrapper.find('thead td').map((e) => e.text()))
        .to.have.members(['Title', 'Status', 'Updated', 'Author', 'Actions'])
    })

    it('renders props.tickets', () => {
      expect(_wrapper.find('tbody tr')).to.have.length(1)
    })
  })
})

import TicketRoute from 'routes/Ticket'

describe('(Route) Ticket', () => {
  let _route

  beforeEach(() => {
    _route = TicketRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `/tickets/:id`', () => {
    expect(_route.path).to.equal('/tickets/:id')
  })
})

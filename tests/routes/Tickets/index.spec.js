import TicketsRoute from 'routes/Tickets'

describe('(Route) Tickets', () => {
  let _route

  beforeEach(() => {
    _route = TicketsRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `tickets`', () => {
    expect(_route.path).to.equal('tickets')
  })
})

import UsersRoute from 'routes/Users'

describe('(Route) Users', () => {
  let _route

  beforeEach(() => {
    _route = UsersRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `users`', () => {
    expect(_route.path).to.equal('users')
  })
})

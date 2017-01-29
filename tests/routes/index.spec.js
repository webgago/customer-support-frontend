import createRoutes from 'routes'

describe('Routes', () => {
  let _routes

  beforeEach(() => {
    _routes = createRoutes({})
  })

  it('Should return a routes configuration object', () => {
    expect(_routes).to.have.keys('path', 'component', 'indexRoute', 'childRoutes')
  })
})

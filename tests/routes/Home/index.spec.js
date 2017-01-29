import HomeRoute from 'routes/Home'
import HomeView from 'routes/Home/components/HomeView'

describe('(Route) Home', () => {
  let _route

  beforeEach(() => {
    _route = HomeRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain HomeView component', () => {
    expect(_route.component).to.equal(HomeView)
  })
})

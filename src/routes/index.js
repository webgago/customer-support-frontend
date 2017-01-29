// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import HomeRoute from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import TicketsRoute from './Tickets'
import TicketRoute from './Ticket'
import ReportRoute from './Report'
import UsersRoute from './Users'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : HomeRoute(store),
  childRoutes : [
    LoginRoute(store),
    SignupRoute(store),
    TicketsRoute(store),
    TicketRoute(store),
    UsersRoute(store),
    ReportRoute(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Tickets').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes

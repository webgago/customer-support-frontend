import { injectReducer } from '../../store/reducers'
import { shouldBeAuthorized } from '../../containers/Auth/validation'

export default (store) => ({
  path : 'tickets',
  onEnter: (nextState, replace) => {
    shouldBeAuthorized(store, nextState, replace)
  },
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Tickets = require('./containers/TicketsContainer').default
      const reducer = require('./modules/tickets').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'tickets', reducer })

      /*  Return getComponent   */
      cb(null, Tickets)

    /* Webpack named bundle   */
    }, 'tickets')
  }
})

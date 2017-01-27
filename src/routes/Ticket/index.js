import { injectReducer } from '../../store/reducers'
import { shouldBeAuthorized } from '../../containers/Auth/validation'

export default (store) => ({
  path : '/tickets/:id',
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
      const Ticket = require('./containers/TicketContainer').default
      const reducer = require('./modules/ticket').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'ticket', reducer })

      /*  Return getComponent   */
      cb(null, Ticket)

    /* Webpack named bundle   */
    }, 'ticket')
  }
})

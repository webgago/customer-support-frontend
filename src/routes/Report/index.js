import { injectReducer } from '../../store/reducers'
import { shouldBeAuthorized } from '../../containers/Auth/validation'

export default (store) => ({
  path : 'report',
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
      const Report = require('./containers/ReportContainer').default
      const reducer = require('./modules/report').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'report', reducer })

      /*  Return getComponent   */
      cb(null, Report)

    /* Webpack named bundle   */
    }, 'report')
  }
})

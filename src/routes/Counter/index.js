import { injectReducer } from '../../store/reducers'
import { selectCurrentUser } from 'containers/Auth/selectors';

const isLoggedIn = (store) => !!selectCurrentUser()(store.getState());

const shouldBeNotAuthorized = (store, nextState, replace) => {
  if (isLoggedIn(store)) {
    replace('/');
  }
};

const shouldBeAuthorized = (store, nextState, replace) => {
  if (!isLoggedIn(store)) {
    store.dispatch(changeError('You should be authorized to access this page!', true));
    replace({
      pathname: '/',
      query: { nextPathname: nextState.location.pathname },
    });
  }
};

export default (store) => ({
  path : 'counter',
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
      const Counter = require('./containers/CounterContainer').default
      const reducer = require('./modules/counter').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'counter', reducer })

      /*  Return getComponent   */
      cb(null, Counter)

    /* Webpack named bundle   */
    }, 'counter')
  }
})

import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { selectLocationState } from './selectors'
import { IntlProvider } from 'react-intl'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired,
    notifications: PropTypes.array
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    const history = syncHistoryWithStore(browserHistory, store, {
      selectLocationState: selectLocationState()
    })

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <IntlProvider locale='en'>
            <Router history={history} children={routes} />
          </IntlProvider>
        </div>
      </Provider>
    )
  }
}

export default AppContainer

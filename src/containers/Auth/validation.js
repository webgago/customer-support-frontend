import { selectCurrentUser } from 'containers/Auth/selectors'
import Notifications from 'react-notification-system-redux'

export const isLoggedIn = (store) => !!selectCurrentUser()(store.getState())

export const shouldNotBeAuthorized = (store, nextState, replace) => {
  if (isLoggedIn(store)) {
    replace('/tickets')
  }
}

export const shouldBeAuthorized = (store, nextState, replace) => {
  if (!isLoggedIn(store)) {
    store.dispatch(Notifications.error({ title: 'You should be authorized to access this page!' }))
    replace({
      pathname: '/',
      query: { nextPathname: nextState.location.pathname }
    })
  }
}

export const shouldBeAdmin = (store, nextState, replace) => {
  shouldBeAuthorized(store, nextState, replace)
  let user = selectCurrentUser()(store.getState())

  if (user.role !== 'admin') {
    store.dispatch(Notifications.error({ title: 'Only and Admin can access this page!' }))
    replace({ pathname: '/' })
  }
}

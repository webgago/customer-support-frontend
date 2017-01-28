/**
 * The global state selectors
 */
import { fromJS } from 'immutable'
import { createSelector } from 'reselect'

const selectGlobal = () => (state) => state.get('global')

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
)

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
)

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
)

/**
 * Direct selector to the route state domain
 */
const selectRouteDomain = () => (state) => state.get('routing')

/**
 * Other specific selectors
 */

const selectRoute = () => createSelector(
  selectRouteDomain(),
  (routeState) => (routeState.locationBeforeTransitions)
)

const selectNextPathname = () => createSelector(
  selectRoute(),
  (route) => {
    const { query, state } = route
    return (query || state || {}).nextPathname
  }
)

const selectCurrentPathname = () => createSelector(
  selectRoute(),
  (route) => route.pathname
)

const selectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = fromJS(state.get('routing'))

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectLocationState,
  selectRoute,
  selectRouteDomain,
  selectNextPathname,
  selectCurrentPathname
}

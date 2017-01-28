import { createSelector } from 'reselect'

/**
 * Direct selector to the auth state domain
 */
const selectAuthDomain = () => (state) => state.get('auth')

/**
 * Other specific selectors
 */

const selectCurrentUser = () => createSelector(
  selectAuthDomain(),
  (authState) => {
    const user = authState.get('user')
    return user ? user.toJS() : null
  }
)

/**
 * Default selector used by Auth
 */

const selectAuth = () => createSelector(
  selectAuthDomain(),
  (authState) => ({ authState: authState.toJS() })
)

export {
  selectAuthDomain,
  selectAuth,
  selectCurrentUser
}

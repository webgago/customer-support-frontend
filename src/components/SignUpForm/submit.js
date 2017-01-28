import { SubmissionError } from 'redux-form'
import * as appActions from 'containers/App/actions'
import * as authActions from 'containers/Auth/actions'
import Notifications from 'react-notification-system-redux'

function submit (values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(appActions.signup(
      values.get('first_name'), values.get('last_name'),
      values.get('email'), values.get('password'),
      { resolve, reject })
    )
  })
  .then((user) => {
    dispatch(Notifications.success({ title: 'You successfully signed up!' }))
    dispatch(authActions.login(user.email, user.password))
    return user
  })
  .catch((errors) => {
    if (errors) {
      throw new SubmissionError({ _error: errors.base && errors.base[0], ...errors })
    }
  })
}

export default submit

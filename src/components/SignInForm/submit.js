import { SubmissionError } from 'redux-form'
import * as authActions from 'containers/Auth/actions'
import Notifications from 'react-notification-system-redux'

function submit (values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(authActions.login(values.get('email'), values.get('password'), { resolve, reject }))
  })
  .then((user) => {
    dispatch(Notifications.success({ title: 'You successfully logged in!' }))
    return user
  })
  .catch(({ errors }) => {
    if (errors) {
      throw new SubmissionError({ ...errors })
    }
  })
}

export default submit

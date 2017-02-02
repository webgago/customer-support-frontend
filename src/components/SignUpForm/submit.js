import { SubmissionError } from 'redux-form'
import * as appActions from 'containers/App/actions'
import Notifications from 'react-notification-system-redux'

function submit (values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(appActions.signup(
      values.get('first_name'), values.get('last_name'),
      values.get('email'), values.get('password'),
      { resolve, reject })
    )
  })
  .then(() => {
    dispatch(Notifications.success({ title: 'You successfully signed up!' }))
    return null
  })
  .catch(({ errors }) => {
    if (errors) {
      throw new SubmissionError({ ...errors })
    }
  })
}

export default submit

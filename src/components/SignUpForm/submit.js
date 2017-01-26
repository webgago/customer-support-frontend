import { SubmissionError } from 'redux-form'
import * as authActions from 'containers/Auth/actions'

function submit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(authActions.login(values.email, values.password, { resolve, reject }));
  }).then((user) => user, (errors) => {
    throw new SubmissionError({ _error: errors.base[0] });
  });
}

export default submit

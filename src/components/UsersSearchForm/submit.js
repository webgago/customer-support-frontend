import { SubmissionError } from 'redux-form'
import * as api from '../../services/api'
import { replace } from 'react-router-redux'

function submit (values, dispatch) {
  return api.searchUsers(values.toJS())
    .then((users) => {
      dispatch(replace({ pathname: '/users', query: values.toJS() }))
    })
    .catch((errors) => {
      if (errors) {
        throw new SubmissionError({ _error: errors.base && errors.base[0], ...errors })
      }
    })
}

export default submit

import { SubmissionError } from 'redux-form'
import * as api from '../../services/api'
import { replace } from 'react-router-redux'

function submit (values, dispatch) {
  return api.searchTickets(values.toJS())
    .then((tickets) => {
      dispatch(replace({ pathname: '/tickets', query: values.toJS() }))
    })
    .catch(({ errors }) => {
      if (errors) {
        throw new SubmissionError({ ...errors })
      }
    })
}

export default submit

import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import submit from './submit'

export const Form = (props) => {
  const { handleSubmit, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='form-group col-md-8'>
          <Field
            name='q'
            type='input' component='input' className='form-control' placeholder='Search...' autoComplete='off' />
        </div>
        <div className='col-md-2'>
          <button type='submit' className='btn btn-success' disabled={submitting}>Find</button>
        </div>
      </div>
    </form>
  )
}

Form.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

const UsersSearchForm = reduxForm({
  form: 'ticketsSearchForm',
  onSubmit: submit
})(Form)

export default UsersSearchForm

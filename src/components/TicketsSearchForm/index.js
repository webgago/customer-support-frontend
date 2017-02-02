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
        <div className='form-group col-md-2'>
          <Field type='select' name='status' component='select' className='form-control'>
            <option value=''>any</option>
            <option value='new'>new</option>
            <option value='open'>open</option>
            <option value='closed'>closed</option>
          </Field>
        </div>
        <div className='col-md-2 no-print'>
          <button type='submit' className='btn btn-success pull-right' disabled={submitting}>Find</button>
        </div>
      </div>
    </form>
  )
}

Form.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

const TicketsSearchForm = reduxForm({
  form: 'ticketsSearchForm',
  onSubmit: submit
})(Form)

export default TicketsSearchForm

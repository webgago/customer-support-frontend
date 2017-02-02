import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import submit from './submit'
import { Validator } from '../../services/validation'
import Input from '../Input'
import Textarea from '../Textarea'

const validate = values => {
  return new Validator(values)
    .required('title', 'body')
    .errors
}

export const Form = (props) => {
  const { handleSubmit, onCancel, error, pristine, submitting } = props

  return (
    <div className='panel panel-default'>
      <div className='panel-heading'>
        <h3 className='panel-title'>Add Ticket</h3>
      </div>
      <div className='panel-body'>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-9'>
              <div className='form-group'>
                <Field type='text' name='title' component={Input} label='Title' className='form-control' />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-md-9'>
              <Field name='body' component={Textarea} label='Body' className='form-control' rows='5' />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-3'>
              <div>{error && <strong>{error}</strong>}</div>
              <button type='submit' className='btn btn-success' disabled={pristine || submitting}>Submit</button>
              {' '}
              {onCancel && <button type='button' onClick={onCancel} className='btn btn-default'>Cancel</button>}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

Form.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func,
  error: React.PropTypes.string,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
}

const TicketForm = reduxForm({
  form: 'ticketForm',
  validate,
  onSubmit: submit
})(Form)

export default TicketForm

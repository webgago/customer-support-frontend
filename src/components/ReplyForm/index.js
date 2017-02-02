import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import submit from './submit'
import { Validator } from '../../services/validation'
import { fromJS } from 'immutable'
import { reopenTicket, closeTicket } from '../../routes/Ticket/modules/ticket'

const validate = values => {
  return new Validator(values)
    .required('reply', 'status')
    .errors
}

export const Form = (props) => {
  const { handleSubmit, pristine, submitting, ticket, dispatch, reopen, close } = props

  const doReopen = () => dispatch(reopenTicket(ticket.id))
  const doClose = () => dispatch(closeTicket(ticket.id))

  return (
    <form onSubmit={handleSubmit((values) => submit(values, ticket, dispatch))}>
      {!reopen && <div className='form-group'>
        <Field name='reply' type='textarea' component='textarea' className='form-control' rows='5' />
      </div>}
      {!reopen && <div className='row'>
        <div className='col-md-3'>
          <div className='form-group'>
            <Field type='select' name='status' component='select' className='form-control'>
              <option value='open'>open</option>
              <option value='closed'>closed</option>
            </Field>
          </div>
        </div>
        <div className='col-md-9'>
          <button type='submit' className='btn btn-success' disabled={pristine || submitting}>Submit</button>
          {close && <button type='button' className='btn btn-danger pull-right' onClick={doClose}>Close Ticket</button>}
        </div>
      </div>}
      {reopen && <div className='row'>
        <div className='col-md-12'>
          <button type='button' className='btn btn-success pull-right' onClick={doReopen}>Reopen</button>
        </div>
      </div>}
    </form>
  )
}

Form.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  ticket: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  reopen: React.PropTypes.bool,
  close: React.PropTypes.bool
}

const ReplyForm = reduxForm({
  form: 'replyForm',
  validate,
  onSubmit: submit,
  initialValues: fromJS({ status: 'open' })
})(Form)

export default ReplyForm

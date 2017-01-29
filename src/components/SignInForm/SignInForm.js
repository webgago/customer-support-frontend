import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import Input from '../Input'
import submit from './submit'
import { Validator } from '../../services/validation'
import { Link } from 'react-router'

const validation = values => {
  return new Validator(values)
    .required('email', 'password')
    .email('email')
    .errors
}

export const SignInForm = (props) => {
  const { handleSubmit, error, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field component={Input} name='email' type='email' label='Email' />
      <Field component={Input} name='password' type='password' label='Password' />
      {error && <strong>{error}</strong>}
      <div>
        <button type='submit' className='btn btn-default' disabled={pristine || submitting}>Login</button>
        {' '} or <Link to='/signup'>signup</Link>
      </div>
    </form>
  )
}

SignInForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string
}

export default reduxForm({
  form: 'signupForm',
  validate: validation,
  onSubmit: submit
})(SignInForm)

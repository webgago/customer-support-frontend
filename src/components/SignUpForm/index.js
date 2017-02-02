import React from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import Input from '../Input'
import submit from './submit'
import { Validator } from '../../services/validation'
import { Link } from 'react-router'

const validate = values => {
  return new Validator(values)
    .required('email', 'password', 'first_name', 'last_name')
    .email('email')
    .errors
}

export const SignUpForm = (props) => {
  const { handleSubmit, error, pristine, submitting } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field component={Input} name='first_name' type='text' label='First Name' />
      <Field component={Input} name='last_name' type='text' label='Last Name' />
      <Field component={Input} name='email' type='email' label='Email' />
      <Field component={Input} name='password' type='password' label='Password' />
      <div>{error && <strong>{error}</strong>}</div>
      <div>
        <button type='submit' className='btn btn-default' disabled={pristine || submitting}>Sign Up</button>
        {' '} or <Link to='/login'>login</Link>
      </div>
    </form>
  )
}

SignUpForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string
}

export default reduxForm({
  form: 'signupForm',
  validate,
  onSubmit: submit
})(SignUpForm)

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Input from '../Input'
import submit from './submit'

const validate = values => {
  const errors = {}
  return errors
}

export const SignUpForm = (props) => {
  const {handleSubmit, error, pristine, submitting} = props

  return (
    <form className="col-md-4" onSubmit={handleSubmit}>
      <Field component={Input} name="firstName" type="text" label="First Name"/>
      <Field component={Input} name="lastName" type="text" label="Last Name"/>
      <Field component={Input} name="email" type="email" label="Email"/>
      <Field component={Input} name="password" type="password" label="Password"/>
      {error && <strong>{error}</strong>}
      <button type="submit" className="btn btn-default" disabled={pristine || submitting}>Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'signupForm',
  validate,
  onSubmit: submit,
  initialValues: { firstName: 'Anton', lastName: 'Sozontov' }
})(SignUpForm)

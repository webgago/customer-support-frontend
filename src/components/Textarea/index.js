import React from 'react'

export const Textarea = ({ input, label, meta: { touched, error, invalid } }) => {
  const errorClass = () => hasError() ? 'has-error' : 'has-success'
  const hasError = () => touched && invalid && error

  return (
    <div className={'form-group ' + errorClass()}>
      <label>{label}</label>
      <textarea className='form-control' {...input} />
      {hasError() && <span className='help-block'>{error}</span>}
    </div>
  )
}

Textarea.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired
}
export default Textarea

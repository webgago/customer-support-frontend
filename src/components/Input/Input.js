import React from 'react'

export const Input = ({ input, label, type, meta: { touched, error } }) => {
  const errorClass = () => error ? 'has-error' : 'has-success'

  return (
    <div className={'form-group ' + errorClass()}>
      <label>{label}</label>
      <input type={type} className='form-control' {...input} />
      {touched && error && <span className='help-block'>{error}</span>}
    </div>
  )
}

Input.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired
}
export default Input

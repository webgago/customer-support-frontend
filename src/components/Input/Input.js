import React from 'react'

export const Input = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} className="form-control" {...input}/>
      {touched && error && <span className="help-block">{error}</span>}
    </div>
  )
}

export default Input

import React from 'react'

export const Input = ({ input, label, type, meta: { touched, error } }) => {
  const errorClass = () => error ? "has-error" : "has-success"

  return (
    <div className={"form-group " + errorClass() }>
      <label>{label}</label>
      <input type={type} className="form-control" {...input}/>
      {touched && error && <span className="help-block">{error}</span>}
    </div>
  )
}

export default Input

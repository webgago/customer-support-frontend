export const email = (key, values, errors) => {
  if (!/^.+@.+\..+$/i.test(values.get(key))) {
    return { [key]: 'Invalid email address', ...errors }
  }
  return errors
}

export const required = (key, values, errors) => {
  if (!values.get(key)) {
    return { [key]: 'Required', ...errors }
  }
  return errors
}

export class Validator {
  constructor (values) {
    this.values = values
    this.errors = {}
  }

  email (...keys) {
    keys.forEach((key) => {
      this.errors = email(key, this.values, this.errors)
    })
    return this
  }

  required (...keys) {
    keys.forEach((key) => {
      this.errors = required(key, this.values, this.errors)
    })
    return this
  }
}

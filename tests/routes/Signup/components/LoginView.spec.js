import React from 'react'
import { SignupView } from 'routes/Signup/components/SignupView'
import SignUpForm from 'components/SignUpForm'
import { shallow } from 'enzyme'

describe('(View) SignupView', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<SignupView />)
  })

  it('Renders a div with class signup-form', () => {
    expect(_wrapper.is('div.signup-form')).to.equal(true)
  })

  it('Renders h1', () => {
    expect(_wrapper.contains(<h1>Sign Up</h1>)).to.equal(true)
  })

  it('Renders SignUpForm', () => {
    expect(_wrapper.contains(<SignUpForm />)).to.equal(true)
  })
})

import React from 'react'
import { LoginView } from 'routes/Login/components/LoginView'
import SignInForm from 'components/SignInForm'
import { shallow } from 'enzyme'

describe('(View) LoginView', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<LoginView />)
  })

  it('Renders a div with class login-form', () => {
    expect(_wrapper.is('div.login-form')).to.equal(true)
  })

  it('Renders h1', () => {
    expect(_wrapper.contains(<h1>Login</h1>)).to.equal(true)
  })

  it('Renders SignInForm', () => {
    expect(_wrapper.contains(<SignInForm />)).to.equal(true)
  })
})

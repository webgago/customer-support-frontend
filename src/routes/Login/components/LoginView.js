import React from 'react'
import './LoginView.scss'
import SignInForm from '../../../components/SignInForm'
import { Link } from 'react-router'

export const LoginView = () => (
  <div className="login-form">
    <h1>Login</h1>
    <SignInForm/>
  </div>
)

export default LoginView

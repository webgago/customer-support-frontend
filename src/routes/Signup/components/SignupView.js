import React from 'react'
import './SignupView.scss'
import SignUpForm from '../../../components/SignUpForm'
import { Link } from 'react-router'

export const LoginView = () => (
  <div className="signup-form">
    <h1>Sign Up</h1>
    <SignUpForm/>
  </div>
)

export default LoginView

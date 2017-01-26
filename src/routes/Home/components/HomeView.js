import React from 'react'
import './HomeView.scss'
import SignUpForm from '../../../components/SignUpForm'

export const HomeView = () => (
  <div>
    <h1>Welcome to Customer Support ticketing system</h1>
    <p>Please login or sign up</p>
    <SignUpForm/>
  </div>
)

export default HomeView

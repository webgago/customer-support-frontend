import React from 'react'
import './HomeView.scss'
import { Link } from 'react-router'

export const HomeView = () => (
  <div>
    <h1>Welcome to Customer Support ticketing system</h1>
    <p>
      Please
      <Link to='/login'>login</Link>or<Link to='/signup'>sign up</Link>
      to access customer support
    </p>
  </div>
)

export default HomeView

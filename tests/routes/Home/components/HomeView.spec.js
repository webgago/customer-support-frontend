import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import { Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(View) HomeView', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<HomeView />)
  })

  it('Renders a div', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Renders h1', () => {
    expect(_wrapper.contains(<h1>Welcome to Customer Support ticketing system</h1>)).to.equal(true)
  })

  it('Renders Link to login', () => {
    expect(_wrapper.contains(<Link to='/login'>login</Link>)).to.equal(true)
  })

  it('Renders Link to signup', () => {
    expect(_wrapper.contains(<Link to='/signup'>sign up</Link>)).to.equal(true)
  })
})

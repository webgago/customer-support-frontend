import React from 'react'
import Header from 'components/Header'
import { Link } from 'react-router'

import { bindActionCreators } from 'redux'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      currentUser: { full_name: 'Mr. Anderson' },
      router: { isActive: () => true },
      ...bindActionCreators({
        logout: (_spies.logout = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Header {..._props} />)
  })

  it('Renders a nav', () => {
    expect(_wrapper.is('nav')).to.equal(true)
  })

  it('Renders user name', () => {
    expect(_wrapper.text()).to.include('Signed in as Mr. Anderson')
  })

  it('Renders Tickets link', () => {
    expect(_wrapper.contains(<Link to='/tickets'>Tickets</Link>)).to.be.true
  })

  describe('when user is an agent', () => {
    beforeEach(() => {
      _props.currentUser.role = 'support_agent'
      _wrapper = shallow(<Header {..._props} />)
    })

    it('Renders Report link', () => {
      expect(_wrapper.contains(<Link to='/report'>Report</Link>)).to.be.true
    })
  })

  describe('when user is an admin', () => {
    beforeEach(() => {
      _props.currentUser.role = 'admin'
      _wrapper = shallow(<Header {..._props} />)
    })

    it('Renders Users link', () => {
      expect(_wrapper.contains(<Link to='/users'>Users</Link>)).to.be.true
    })
  })
})

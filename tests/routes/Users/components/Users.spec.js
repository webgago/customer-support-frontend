import React from 'react'
import { bindActionCreators } from 'redux'
import { Users } from 'routes/Users/components/Users'
import UsersSearchForm from 'components/UsersSearchForm'
import { shallow } from 'enzyme'

describe('(Component) Users', () => {
  let _props, _spies, _wrapper, user

  describe('without users', () => {
    beforeEach(() => {
      _spies = {}
      _props = {
        users: [],
        location: { query: { q: '' } },
        ...bindActionCreators({
          loadUsers: (_spies.loadUsers = sinon.spy()),
          deleteUser: (_spies.loadUsers = sinon.spy())
        }, _spies.dispatch = sinon.spy())
      }
      _wrapper = shallow(<Users {..._props} />)
    })

    it('Should render as a div with class users.', () => {
      expect(_wrapper.is('div.users')).to.equal(true)
    })

    it('Should render text `No users yet`.', () => {
      expect(_wrapper.find('.jumbotron').text()).to.match(/No users yet/)
    })

    it('Should render UsersSearchForm', () => {
      expect(_wrapper.contains(<UsersSearchForm />)).to.equal(true)
    })
  })

  describe('with users', () => {
    beforeEach(() => {
      _spies = {}
      user = {
        id: 1, full_name: 'Mr. Anderson', email: 'email@example.com', role: 'admin'
      }
      _props = {
        users: [user],
        location: { query: { q: '' } },
        ...bindActionCreators({
          loadUsers: (_spies.loadUsers = sinon.spy()),
          deleteUser: (_spies.loadUsers = sinon.spy())
        }, _spies.dispatch = sinon.spy())
      }
      _wrapper = shallow(<Users {..._props} />)
    })

    it('Should render as a div with class users.', () => {
      expect(_wrapper.is('div.users')).to.equal(true)
    })

    it('Should render UsersSearchForm', () => {
      expect(_wrapper.find(UsersSearchForm)).to.have.length(1)
    })

    it('Should render with an <h2>.', () => {
      expect(_wrapper.find('h2').text()).to.match(/Users/)
    })

    it('Should render with an <thead>.', () => {
      expect(_wrapper.find('thead td').map((e) => e.text()))
        .to.have.members(['ID', 'Name', 'Email', 'Role', 'Actions'])
    })

    it('renders props.users', () => {
      expect(_wrapper.find('tbody tr')).to.have.length(1)
    })
  })
})

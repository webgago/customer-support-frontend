import React from 'react'
import UsersSearchForm from '../../../components/UsersSearchForm'
import './Users.scss'

export const User = ({ user, deleteUser }) => {
  const destroy = id => () => deleteUser(id)

  return (
    <tr key={user.id}>
      <td>
        <span>{user.id}</span>
      </td>
      <td>
        <span>{user.full_name}</span>
      </td>
      <td>
        <span>{user.email}</span>
      </td>
      <td>
        <span>{user.role}</span>
      </td>
      <td>
        <button className='btn btn-danger' onClick={destroy(user.id)}>Delete</button>
      </td>
    </tr>
  )
}

User.propTypes = {
  user: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired
}

export class Users extends React.Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired,
    loadUsers: React.PropTypes.func.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.loadUsers()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location.query !== this.props.location.query) {
      this.props.loadUsers(nextProps.location.query)
    }
  }

  render () {
    let { users, deleteUser } = this.props
    let q = this.props.location.query.q

    return (
      <div className='users'>
        <UsersSearchForm />
        {users.length !== 0 && <div>
          <h2>Users</h2>
          <table className='table table-bordered'>
            <thead>
              <tr className='active'>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (User({ user, deleteUser })))}
            </tbody>
          </table>
        </div>}
        {users.length === 0 && <div className='jumbotron'>
          {q && <p className='text-center'>
            {`We couldn’t find any users matching '${q}'`}
          </p>}
          {!q && <p className='text-center'>
            No users yet
          </p>}
        </div>}
      </div>
    )
  }
}

export default Users

import React from 'react'
import {IndexLink, Link} from 'react-router'
import './Header.scss'

export const Header = ({currentUser, logout, router}) => {
  const activeClass = (path, indexOnly) => router.isActive(path, indexOnly) ? 'active' : ''

  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to='/'>
            Support
          </Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            {!currentUser && <li className={activeClass('/', true)}>
              <IndexLink to='/'>
                Home
              </IndexLink>
            </li>}
            <li className={activeClass('/counter')}>
              <Link to='/counter'>
                Counter
              </Link>
            </li>
            {currentUser && <li className={activeClass('/tickets')}>
              <Link to='/tickets'>
                Tickets
              </Link>
            </li>}
          </ul>
          {currentUser && <ul className="nav navbar-nav navbar-right">
            <li>
              <a onClick={logout}>
                Logout
              </a>
            </li>
          </ul>}
          {currentUser && <p className="navbar-text navbar-right">
            Signed in as {currentUser.first_name} {currentUser.last_name}
          </p>}
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = {
  currentUser: React.PropTypes.object,
  logout: React.PropTypes.func,
  router: React.PropTypes.object,
}


export default Header

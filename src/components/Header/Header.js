import React from 'react'
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux';
import './Header.scss'

export const Header = ({currentUser}) => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">Support</a>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className='active'>
            <IndexLink to='/'>
              Home
            </IndexLink>
          </li>
          <li>
            <Link to='/counter'>
              Counter
            </Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to='/logout'>
              Logout
            </Link>
          </li>
        </ul>
        <p className="navbar-text navbar-right">Signed in as {currentUser.first_name} {currentUser.last_name}</p>
      </div>
    </div>
  </nav>
)

Header.propTypes = {
  currentUser: React.PropTypes.object,
}


// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser(),
// });
//
// function mapDispatchToProps(dispatch) {
//   return {
//     goTo: (to) => dispatch(push(to)),
//     logout: () => dispatch(authActions.logout()),
//     dispatch,
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header

import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from 'containers/Auth/selectors'
import * as authActions from 'containers/Auth/actions'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'
import Notifications from 'react-notification-system-redux'

export const CoreLayout = ({ children, currentUser, logout, notifications, goTo, router }) => (
  <div>
    <Header currentUser={currentUser} logout={logout} router={router} />
    <div className='container body core-layout__viewport'>
      {children}
    </div>
    <Notifications notifications={notifications} />
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
  currentUser: React.PropTypes.object,
  goTo: React.PropTypes.func,
  logout: React.PropTypes.func,
  notifications: React.PropTypes.array,
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  notifications: (state) => state.get('notifications'),
  router: (state, ownProps) => ownProps.router
})

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(authActions.logout()),
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)

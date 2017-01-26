import React from 'react'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'containers/Auth/selectors';
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children, currentUser }) => (
  <div>
    <Header currentUser={currentUser}/>
    <div className='container body core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
  currentUser: React.PropTypes.object,
  goTo: React.PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    goTo: (to) => dispatch(push(to)),
    logout: () => dispatch(authActions.logout()),
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);

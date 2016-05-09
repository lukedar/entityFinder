import React, { Component } from 'react';
import { connect } from 'react-redux';

class Authentication extends Component {
  render() {
    if (this.props.isAuthenticated) {
       return(<div>{this.props.children}</div>);
    }

    if (!this.props.isAuthenticated) {
      return null;
    }
  }
}


// Map application state.
function mapStateToProps(state) {
  //console.log('users loged in', state.auth.isAuthenticated);

  return {
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.auth.userProfile
  }
}

export default connect(mapStateToProps)(Authentication);
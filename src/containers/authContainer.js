import React, { Component } from 'react';
import { connect } from 'react-redux';

class Authentication extends Component {
  render() {
  	// Handle Anonuser render
  	if (this.props.anonUserOnly && !this.props.isAuthenticated) {
  		return(<div>{this.props.children}</div>);
  	}
  	else if (this.props.anonUserOnly && this.props.isAuthenticated) {
  		return null;
  	}

  	// Handle authenticated user.
    if (this.props.isAuthenticated) {
       return(<div>{this.props.children}</div>);
    }
    else if (!this.props.isAuthenticated) {
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
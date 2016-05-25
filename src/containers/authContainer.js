import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Auth extends Component {

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


Auth.propTypes = {
  anonUserOnly: PropTypes.bool
}

// Map application state.
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Auth);
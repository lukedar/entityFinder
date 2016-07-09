import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Firebase from 'Firebase';
const myFirebaseRef = new Firebase('https://granulr.firebaseio.com/'); 
class Auth extends Component {

  componentDidMount() {
    myFirebaseRef.child('userId').on("value", function(snapshot) {
      console.log(snapshot.val());
    });
  }

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
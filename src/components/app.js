import React, { PropTypes, Component } from "react";
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import { Link } from 'react-router';
import { loginUser } from '../actions';


const styles = {
  appBar: {
    textAlign: "center"
  },	
  link: {
    textDecoration: 'none'
  }
};

class App extends Component {
	constructor(props) {
	   super(props);
	   this.state = {open: false};
	 }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  componentWillMount() {
    console.log('will mount');

    this.lock = new Auth0Lock('83jvTjeBnhM7J7v054OMqhpHoFRCWhZr', 'entity.auth0.com');
    this.state.idToken = this.getIdToken();


    this.lock.getProfile(this.state.idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }
      console.log(profile);
    }.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('is updating');
    this.state.idToken = this.getIdToken();
  }

  showLock() {
    this.lock.show();
  }

  getIdToken() {
    // First, check if there is already a JWT in local storage
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    // If there is no JWT in local storage and there is one in the URL hash,
    // save it in local storage
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('id_token', authHash.id_token);
      }
      if (authHash.error) {
        // Handle any error conditions
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    console.log(this.lock.getProfile);

    return (
      <div>
	      <AppBar
	      	style={styles.appBar}
			    title="Event Finder"
			    iconClassNameRight="muidocs-icon-navigation-expand-more"
			    onLeftIconButtonTouchTap={this.handleToggle}
			  />
        	<LeftNav
	          docked={false}
	          width={200}
	          open={this.state.open}
	          onRequestChange={open => this.setState({open})}
	        >
	        <Link style={styles.link} to={'/'}><MenuItem onTouchTap={this.handleClose}>Events</MenuItem></Link>
	        <Link style={styles.link} to={'/locations'}><MenuItem onTouchTap={this.handleClose}>Locations</MenuItem></Link>
	        <Link style={styles.link} to={'/locations'}><MenuItem onTouchTap={this.handleClose}>Search</MenuItem></Link>

	        <MenuItem onTouchTap={this.showLock.bind(this)}>My Events</MenuItem>
	        </LeftNav>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(App);

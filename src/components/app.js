import React, { PropTypes, Component } from "react";
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import { receiveLogin } from '../actions/index';
import AppBar from 'material-ui/lib/app-bar';
import { Link } from 'react-router';
import { loginUser, logoutUser } from '../actions';
import Auth from '../containers/authContainer';
import ConfigContainer from '../containers/configContainer';

class App extends Component {
	constructor(props) {
	   super(props);
	   this.state = {open: false};
	 }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  componentWillMount() {
    this.lock = new Auth0Lock('83jvTjeBnhM7J7v054OMqhpHoFRCWhZr', 'entity.auth0.com');
    this.state.idToken = this.checkAndSetUserIdToken();

    if (this.state.idToken && !this.props.userProfile) {
      this.dispatchUserProfile(this.state.idToken); 
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.state.idToken = this.checkAndSetUserIdToken();
    
    if (this.state.idToken && !this.props.userProfile) {
      this.dispatchUserProfile(this.state.idToken); 
    }
  }

  dispatchUserProfile(idToken) {
    this.lock.getProfile(idToken, function (err, profile) {
      if (err) {
        console.log("Error loading the Profile", err);
        return;
      }

      this.props.dispatch(receiveLogin({
        userProfile: profile,
        idToken: this.state.idToken
      }));

    }.bind(this));
  }

  showLock() {
    this.lock.show();
  }

  checkAndSetUserIdToken() {
    var idToken = localStorage.getItem('id_token');
    var authHash = this.lock.parseHash(window.location.hash);
    
    // Set Token to local storage.
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

  getBrandColorByKey() {
    return this.props.config.theme.brand.titleBarBackgroundColor;
  }

  logoutCurrentUser() {
    console.log('logginout');
    window.localStorage.clear();

    this.props.dispatch(logoutUser({
      isAuthenticated: false,
      idToken: null,
      userProfile: null
    }));
    this.setState({open: false});
    history.pushState("", document.title, window.location.pathname);
  }

  render() {
    const { isAuthenticated } = this.props;
    const styles = {
      appBar: {
        textAlign: "center",
        backgroundColor: this.getBrandColorByKey()
      },  
      link: {
        textDecoration: 'none'
      }
    };

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

          <Auth>
            <MenuItem onTouchTap={this.showLock.bind(this)}>My Events</MenuItem>
            <MenuItem onTouchTap={this.showLock.bind(this)}>Friends</MenuItem>
            <MenuItem onTouchTap={this.logoutCurrentUser.bind(this)}>Logout</MenuItem>
          </Auth>

          <Auth anonUserOnly={true}>            
            <MenuItem onTouchTap={this.showLock.bind(this)}>Login</MenuItem>
          </Auth>
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

// Map application state.
function mapStateToProps(state) {

  return {
    isAuthenticated: state.auth.isAuthenticated,
    userProfile: state.auth.userProfile
  }
}

export default connect(mapStateToProps)(ConfigContainer(App));

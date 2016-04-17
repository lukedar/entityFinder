import React from 'react';
import { Component } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import { Link } from 'react-router';


export default class App extends Component {
	constructor(props) {
	   super(props);
	   this.state = {open: false};
	 }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
	      <AppBar
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
	        <MenuItem onTouchTap={this.handleClose}><Link to={'/'}>Events</Link></MenuItem>
	        <MenuItem onTouchTap={this.handleClose}><Link to={'/locations'}>Locations</Link></MenuItem>
	        </LeftNav>
        {this.props.children}
      </div>
    );
  }
}

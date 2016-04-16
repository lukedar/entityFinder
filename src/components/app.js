import React from 'react';
import { Component } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';


export default class App extends Component {

	constructor(props) {
	   super(props);
	   this.state = {leftNavOpen: false};
	 }

	  handleToggle = () => this.setState({leftNavOpen: !this.state.open});

  render() {
    return (
      <div>
	      <div>
	      <AppBar
			    title="Event Finder	"
			    iconClassNameRight="muidocs-icon-navigation-expand-more"
			    onLeftIconButtonTouchTap={this.handleToggle}
			  />
	        <LeftNav open={this.state.leftNavOpen}>
	          <MenuItem>Menu Item</MenuItem>
	          <MenuItem>Menu Item 2</MenuItem>
	        </LeftNav>
	      </div>
        {this.props.children}
      </div>
    );
  }
}

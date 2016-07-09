import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import AuthContainer from '../containers/authContainer';

const styles = {
  link: {
    textDecoration: 'none'
  }
}

class UserListings extends Component {
  static get propTypes() {
    return {
      entities: React.PropTypes.array
    };
  }

  renderEntities(entities) {
return;
  }

  render() {


    console.log(AuthContainer);

    const listTitle = this.props.listingsTitle;

    return (
      <div>
        <List subheader={listTitle}>
          {this.renderEntities(this.props.entities)}
        </List>
      </div>
    );
  }
}

export default UserListings;

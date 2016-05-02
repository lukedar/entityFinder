import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';

const styles = {
  link: {
    textDecoration: 'none'
  }
}

class EntityListings extends Component {
  static get propTypes() {
    return {
      entities: React.PropTypes.array
    };
  }

  renderEntities(entities) {
    return entities.map((entity) => {
      
      console.log(entity);
      return (
        <Link style={styles.link} to={"entity/" + entity.nid}>
          <ListItem
            primaryText={entity.title}
            secondaryText={entity.type.name}
            leftAvatar={
              <Avatar src={entity.type.imageUrl} />
            }
          />
        </Link>
      );
    });
  }

  render() {

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

export default EntityListings;

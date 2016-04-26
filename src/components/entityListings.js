import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

class EntityListings extends Component {
  static get propTypes() {
    return {
      entities: React.PropTypes.array
    };
  }

  renderEntities(entities) {
    return entities.map((entity) => {
      return (
        <Link to={"entity/" + entity.nid}>
          <ListItem
            primaryText={entity.title}
            secondaryText={entity.type.name}
          />
        </Link>
      );
    });
  }

  render() {
    return (
      <div>
        <List>
          {this.renderEntities(this.props.entities)}
        </List>
      </div>
    );
  }
}

export default EntityListings;

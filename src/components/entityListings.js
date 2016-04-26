import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntities, fetchEntitiesByLocation } from '../actions/index';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

class EntityListings extends Component {
  static get propTypes() {
    return {
      locationId: React.PropTypes.string,
      listingsTitle: React.PropTypes.string
    };
  }

  componentWillMount() {
    if (this.props.locationId) {
      this.props.fetchEntitiesByLocation(this.props.locationId);
    }
    else {
      this.props.fetchEntities();
    }
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
    if (!this.props.locationId && !this.props.entities.length || this.props.locationId && !this.props.entitiesByLocation.length) {
      return <CircularProgress />;
    }

    return (
      <div>
        <List subheader={this.props.listingsTitle}>
          {this.props.listingsTitle ? <Divider/> : null}
          {this.renderEntities(this.props.locationId ? this.props.entitiesByLocation: this.props.entities)}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    entities: state.entities.all, 
    entitiesByLocation: state.entitiesByLocation.entities
  };
}

export default connect(mapStateToProps, { fetchEntities, fetchEntitiesByLocation })(EntityListings);

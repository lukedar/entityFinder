import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntities, fetchEntitiesByLocation } from '../actions/index';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import EntityListings from '../components/entityListings';

class EntityListingsContainer extends Component {
  componentWillMount() {
    if (this.props.locationId) {
      this.props.fetchEntitiesByLocation(this.props.locationId);
    }
    else {
      this.props.fetchEntities();
    }
  }

  render() {
    if (!this.props.locationId && !this.props.entities.length || this.props.locationId && !this.props.entitiesByLocation.length) {
      return <CircularProgress />;
    }

    return (
      <div>
        <EntityListings {...this.props} entities={!this.props.locationId ? this.props.entities : this.props.entitiesByLocation} />  
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    entities: state.entities.items, 
    entitiesByLocation: state.entitiesByLocation.entities
  };
}

export default connect(mapStateToProps, { fetchEntities, fetchEntitiesByLocation })(EntityListingsContainer);

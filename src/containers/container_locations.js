import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';
import LocationsMap from '../components/locations_map';

class LocationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { locations: [] };
  }

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchLocation(this.props.params.id);
    } 
    else {
      this.props.fetchLocations();
    }
  }

  render() {
    if (!this.props.params.id && !this.props.locations.length || this.props.params.id && !this.props.location) {
      return <CircularProgress />;
    }

    // Merge locations and location states.
    var locations = this.props.locations;
    var locationsMerge = this.props.location ? locations.concat(this.props.location) : locations;

    return(
        <LocationsMap locationData={locationsMerge} getDirections={locationsMerge.length === 1 || true}/>
      );

  }
}

function mapStateToProps(state) {
  return { 
    locations: state.locations.all,
    location: state.locations.activeLocation
   };
}

export default connect(mapStateToProps, { fetchLocations, fetchLocation })(LocationsContainer);

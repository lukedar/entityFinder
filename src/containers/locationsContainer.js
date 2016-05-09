import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';
import LocationsMap from '../components/locationsMap';

class LocationsContainer extends Component {
  componentWillMount() {
    this.props.fetchLocations();
  }

  render() {
    if (!this.props.locations.length) {
      return <CircularProgress />;
    }

    return(
        <LocationsMap locationData={this.props.locations} getDirections={false}/>
      );

  }
}

function mapStateToProps(state) {
  return { 
    locations: state.locations.items
   };
}

export default connect(mapStateToProps, { fetchLocations, fetchLocation })(LocationsContainer);

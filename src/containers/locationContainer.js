import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';
import LocationsMap from '../components/locationsMap';

class LocationContainer extends Component {
  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchLocation(this.props.params.id);
    } 
  }

  render() {
    if (!this.props.location) {
      return <CircularProgress />;
    }

    return(
        <LocationsMap locationData={this.props.location} getDirections={true} />
      );

  }
}

function mapStateToProps(state) {

  console.log(state);
  return { 
    location: state.locations.activeLocation
   };
}

export default connect(mapStateToProps, { fetchLocations, fetchLocation })(LocationContainer);

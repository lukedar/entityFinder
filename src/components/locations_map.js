import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import PlaceIcon from 'material-ui/lib/svg-icons/maps/place';

class LocationsMap extends Component {
  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchLocation(this.props.params.id);
    } 
    else {
      this.props.fetchLocations();
    }
  }

  renderLocations() {
    return this.props.locations.map((location) => {
      return (
        <li key={location.id}>
          {location.title}<br/>
          lat: {location.marker.lat} <br/>
          lng: {location.marker.lng}
        </li>
      )
    });
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderLocations()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    locations: state.locations.all,
    location: state.locations.activeLocation
   };
}

export default connect(mapStateToProps, { fetchLocations, fetchLocation })(LocationsMap);

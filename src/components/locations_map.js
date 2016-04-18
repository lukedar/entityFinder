import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

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

  getMapRefObject(map) {
    console.log(map);
    return map;
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ <div 
          className='locations-map' 
          style={{height: '100%', width: '100%', position: 'absolute', top: '0', left: '0'}} /> }
        googleMapElement={
          <GoogleMap
            ref={this.getMapRefObject}
            defaultZoom={3}
            defaultCenter={{lat: -25.363882, lng: 131.044922}}>
          </GoogleMap>
        }
      />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class LocationsMap extends Component {
  constructor(props) {
    super(props);
    this.state = { markers: [] };
  }

  componentWillMount() {
    this.setMapData(this.props.locationsData);
  }

  getMapRefObject(map) {
    return map;
  }

  setMapData(locations) {
      var gmaps = google && google.maps,
      markers = [],
      bounds = new gmaps.LatLngBounds();
      locations.map(function(location, index){

          var latLng = new gmaps.LatLng(location.marker.lat, location.marker.lng);
          bounds.extend(latLng);

          markers.push({
              position: {
                lat: location.marker.lat,
                lng: location.marker.lng
              },
              key: location.nid,
              title: location.title,
              locationIndex: location.nid,
              active: true
          });
      }.bind(this));

     this.setState({markers: markers});
  }

  renderMarkers() {
    return this.state.markers.map(function(marker){
      return (
        <Marker
          key={marker.key}
          mapHolderRef={this.props.mapHolderRef}
          position = {new google.maps.LatLng(marker.position.lat, marker.position.lng)}
        >
        </Marker>
      );
    }.bind(this));
  }

  render() {

    console.log(this.renderMarkers());

    return (
      <GoogleMapLoader
        containerElement={ <div 
          className='locations-map' 
          style={{height: '100%', width: '100%', position: 'absolute', top: '0', left: '0'}} /> }
        googleMapElement={
          <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: 51.550462, lng: -0.0152}}>
            {this.renderMarkers()}
          </GoogleMap>
        }
      />
    );
  }
}

export default LocationsMap;

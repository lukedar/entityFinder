import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

class LocationsMap extends Component {
  constructor(props) {
    super(props);
    this.state = { markers: [] };
  }

  componentWillUpdate() {
    this.setMapData(this.props.locationsData);
    console.log('will update', this.props.locationsData);
  }

  componentWillMount() {
    console.log('will mount', this.props.locationsData);
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

      console.log(markers);
  }

  _renderMarkers() {

    // this.props.locations

    // return this.state.markers.map(function(marker){
    //   return (
    //     <Marker
    //       onClick={this._handleOpenInfo.bind(this, marker)}
    //       mapHolderRef={this.props.mapHolderRef}
    //       {...marker}>
    //       {marker.showInfo && !this.props.detailView ? this._renderInfoWindow(marker) : null}
    //     </Marker>
    //   );
    // }.bind(this));
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ <div 
          className='locations-map' 
          style={{height: '100%', width: '100%', position: 'absolute', top: '0', left: '0'}} /> }
        googleMapElement={
          <GoogleMap
            defaultZoom={3}
            defaultCenter={{lat: -25.363882, lng: 131.044922}}>
            {this._renderMarkers()}
          </GoogleMap>
        }
      />
    );
  }
}

export default LocationsMap;

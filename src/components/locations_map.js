import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import PlaceIcon from 'material-ui/lib/svg-icons/maps/place';

class LocationsMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      markers: [], 
      bounds: {}
    };
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
              showInfo: false
          });
      }.bind(this));

     this.setState({
      markers: markers,
      bounds: bounds
    });
  }

  renderMarkers() {
    return this.state.markers.map(function(marker, index){     
      const ref = `marker-${index}`;

      return (
        <Marker
          key={marker.key}
          ref={ref}
          mapHolderRef={this.props.mapHolderRef}
          position = {new google.maps.LatLng(marker.position.lat, marker.position.lng)}
          onClick={this.handleMarkerClick.bind(this, marker)}>
          {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
        </Marker>
      );
    }.bind(this));
  }

  renderInfoWindow(ref, marker) {
    console.log(marker);

    return (
      <InfoWindow 
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >
        <div>
        {marker.title}
        <Link to={'/locations/' + marker.nid + '/details'}>Location info</Link>
        </div>
      </InfoWindow>
    );
  }

  handleMarkerClick(marker) {
    console.log(marker);
    marker.showInfo = true;
    this.setState(this.state);
  }
  
  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={ <div 
          className='locations-map' 
          style={{height: '100%', width: '100%', position: 'absolute', top: '0', left: '0'}} /> }
        googleMapElement={
          <GoogleMap
            defaultZoom={15}
            defaultCenter={this.state.bounds.getCenter()}
            >
            {this.renderMarkers()}
          </GoogleMap>
        }
      />
    );
  }
}

export default LocationsMap;

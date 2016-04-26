import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import InfoIcon from 'material-ui/lib/svg-icons/action/info';
import Directions from 'material-ui/lib/svg-icons/maps/directions';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

class LocationsMap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      markers: [], 
      bounds: {},
      origin: {},
      destination: {},
      directions: null
    };
  }

  componentWillMount() {
    this.setMapData(this.props.locationData);

    if (this.props.getDirections) {
      this.setDestination(this.props.locationData);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.getDirections) {
      this.setDestination(this.props.locationData);
    } 
  }

  setDestination(location) {
    const destination = location[0].marker;
    this.state.destination = new google.maps.LatLng(destination.lat, destination.lng);
  }

  getMapRefObject(map) {
    return map;
  }

  setMapData(locations) {
      var gmaps = google && google.maps;
      var markers = [];
      var bounds = new gmaps.LatLngBounds();

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
              nid: location.nid,
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
    return (
      <InfoWindow 
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >
        <div>
        {marker.title}<br/>
        <a href={'/locations/' + marker.nid + '/details'}><InfoIcon/></a>
        </div>
      </InfoWindow>
    );
  }

  handleMarkerClick(marker) {
    marker.showInfo = true;
    this.setState(this.state);
  }
  
  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  getUserGeolocationAndRenderDirection() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
          origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          destination: this.state.destination,
          travelMode: google.maps.TravelMode.WALKING
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${ result }`);
          }
        });
      }.bind(this));
    } else {
        alert('Geolocation is not supported by this browser.');
    }
  }

  renderGerDirectionsButton() {
    if (this.props.getDirections) {
      return(
        <RaisedButton
          label="Get directions"
          labelPosition="before"
          secondary={true}
          icon={<Directions/>}
          onMouseDown={this.getUserGeolocationAndRenderDirection.bind(this)}
          onTouchStart={this.getUserGeolocationAndRenderDirection.bind(this)}
          style={styles.button}
        /> 
      );
    }
  }

  render() {
    const { origin, directions } = this.state;

    return (
      <div>
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
              {directions ? <DirectionsRenderer directions={directions} /> : null}
            </GoogleMap>
          }
        />
        {this.renderGerDirectionsButton()}
      </div>
    );
  }
}

const styles = {
  button: {
    margin: 12,
    cursor: 'pointer',
    float: 'right'
  }
};

export default LocationsMap;

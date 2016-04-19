import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

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
    renderInfoWindow(ref, marker) {
    
    return (
      
      //You can nest components inside of InfoWindow!
      <InfoWindow 
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >
        
        {ref === 'marker_1' ? 
        
        <div>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" viewBox="0 0 16 16">
            <path d="M6 14.5c0 .828-.672 1.5-1.5 1.5S3 15.328 3 14.5 3.672
              13 4.5 13s1.5.672 1.5 1.5zM16 14.5c0 .828-.672 1.5-1.5 
              1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM16 
              8V2H4c0-.552-.448-1-1-1H0v1h2l.75 6.438C2.294 8.805 2 9.368
              2 10c0 1.105.895 2 2 2h12v-1H4c-.552 0-1-.448-1-1v-.01L16 8z"/>
          </svg>
        </div>  
        
        :
        
        <div>
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" viewBox="0 0 16 16">
            <path d="M3.5 0c-1.7 0-3 1.6-3 3.5 0 1.7 1 3 2.3 3.4l-.5 8c0 
              .6.4 1 1 1h.5c.5 0 1-.4 1-1L4 7C5.5 6.4 6.5 5 6.5 
              3.4c0-2-1.3-3.5-3-3.5zm10 0l-.8 5h-.6l-.3-5h-.4L11 
              5H10l-.8-5H9v6.5c0 .3.2.5.5.5h1.3l-.5 8c0 .6.4 1 1 1h.4c.6 0 
              1-.4 1-1l-.5-8h1.3c.3 0 .5-.2.5-.5V0h-.4z"/>
          </svg>
        </div>
        
        }
      
      </InfoWindow>
      
    );
    
  }

  handleMarkerClick(marker) {
    console.log('maerker clicked');
    marker.showInfo = true;
    this.setState(this.state);
  }
  
  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  renderMarkers() {
    return this.state.markers.map(function(marker){
      return (
        <Marker
          key={marker.key}
          mapHolderRef={this.props.mapHolderRef}
          position = {new google.maps.LatLng(marker.position.lat, marker.position.lng)}
          onClick={this.handleMarkerClick.bind(this, marker)}>
        </Marker>
      );
    }.bind(this));
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

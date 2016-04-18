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
    if (this.props.params.id) {
      this.props.fetchLocation(this.props.params.id);
    } 
    else {
      this.props.fetchLocations();
    }
  }

  getMapRefObject(map) {
    return map;
  }

  setMapData(locations) {
      var gmaps = google && google.maps,
      markers = [],
      bounds = new gmaps.LatLngBounds();

      console.log('set map data', locations);

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

      this.setState({
          markers: markers,
          bounds: bounds
      });

      console.log(this.state.markers);
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

  componentDidMount() {
    console.log('did mount', this.props.locations);

    this.setMapData(this.props.locations)
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

function mapStateToProps(state) {
  return { 
    locations: state.locations.all,
    location: state.locations.activeLocation
   };
}

export default connect(mapStateToProps, { fetchLocations, fetchLocation })(LocationsMap);

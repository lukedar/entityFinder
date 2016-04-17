import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations, fetchLocation } from '../actions/index';

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

    console.log(this.props);

    return (
      <li key={location.id}>
        {location.title}
        {location.title}
      </li>
    )

    return this.props.locations.map((location) => {
      return (
        <li key={location.id}>
          {location.title}
          {location.title}
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

  console.log(state);

  return { 
    locations: state.locations.all,
    location: state.locations.activeLocation
   };
}

export default connect(mapStateToProps, { fetchLocations, fetchLocation })(LocationsMap);

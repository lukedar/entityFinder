import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLocations } from '../actions/index';

class Locations extends Component {
  componentWillMount() {
    this.props.fetchLocations();
  }

  renderLocations() {
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
  return { locations: state.locations.all };
}

export default connect(mapStateToProps, { fetchLocations })(Locations);

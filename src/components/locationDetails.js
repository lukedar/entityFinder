import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchLocation } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import EntitiesByLocation from './entityListings';

class LocationDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchLocation(this.props.params.id);
  }

  render() {
    const { location } = this.props;

    if (!location || location[0].nid !== this.props.params.id) {
      return <CircularProgress />;
    }

    return (
      <div>
        <Card>
          <CardTitle title={location[0].title} />
            <CardText>
              {location[0].description.value} <br/>
            </CardText>
        </Card>
        <EntitiesByLocation locationId={location[0].nid} listingsTitle={'Upcoming Events'}/>
      </div>
    );
  }
}

function mapStateToProps(state) {   
  return { location: state.locations.activeLocation};
}

export default connect(mapStateToProps, { fetchLocation })(LocationDetails);

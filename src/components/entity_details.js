import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEntity, deletePost } from '../actions/index';
import { Link } from 'react-router';

class EntityDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchEntity(this.props.params.id);
  }

  render() {
    const { entity } = this.props;

    if (!entity) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <h3>{entity[0].title}</h3>
        <p>{entity[0].description.value}</p>
        <p>Date: {entity[0].date.value}</p>
        <p>Location: {entity[0].location.title}</p>
        <p>Type: {entity[0].type.name}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entity: state.entities.activeEntity };
}

export default connect(mapStateToProps, { fetchEntity, deletePost })(EntityDetails);

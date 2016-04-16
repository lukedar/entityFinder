import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEntity, deletePost } from '../actions/index';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/lib/circular-progress';

class EntityDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchEntity(this.props.params.id);
  }

  render() {
    const { entity } = this.props;

    if (!entity || entity[0].nid !== this.props.params.id) {
      return <CircularProgress />;
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

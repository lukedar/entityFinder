import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntities } from '../actions/index';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

class EntityListings extends Component {
  componentWillMount() {
    this.props.fetchEntities();
  }

  renderEntities() {

    return this.props.entities.map((entity) => {

      console.log(entity);
      return (
        <li className="list-group-item" key={entity.id}>
          <Link to={"entity/" + entity.nid}>
            <strong>{entity.title}</strong>
          </Link>
          <RaisedButton label="Default" />
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderEntities()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entities: state.entities.all };
}

export default connect(mapStateToProps, { fetchEntities })(EntityListings);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntities } from '../actions/index';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/lib/circular-progress';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

class EntityListings extends Component {
  componentWillMount() {
    this.props.fetchEntities();
  }

  renderEntities() {
    return this.props.entities.map((entity) => {
      return (
        <li key={entity.id}>
          <List>
            <Link to={"entity/" + entity.nid} key={'entity-' + entity.id}>
              <ListItem
                primaryText={entity.title}
                secondaryText={entity.type.name}
              />
            </Link>
          </List>
        </li>
      );
    });
  }

  render() {
    if (!this.props.entities.length) {
      return <CircularProgress />;
    }

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

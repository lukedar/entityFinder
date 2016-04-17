import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEntity } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';
import FontIcon from 'material-ui/lib/font-icon';


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
        <Card>
          <CardTitle title={entity[0].title} subtitle={entity[0].type.name} />
            <CardText>
              <strong>Date</strong>:{entity[0].date.value}<br/>
              <strong>Location</strong>: {entity[0].location.title}<br/><br/>
              {entity[0].description.value} <br/>
            </CardText>
        </Card>
        <FlatButton
          label="Location"
          linkButton={true}
          href={'/locations/' + entity[0].location.nid + '/details'}
          secondary={true}
          icon={<FontIcon className="muidocs-icon-custom-github" />}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entity: state.entities.activeEntity };
}

export default connect(mapStateToProps, { fetchEntity })(EntityDetails);

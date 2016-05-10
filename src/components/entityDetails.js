import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchEntity } from '../actions/index';
import CircularProgress from 'material-ui/lib/circular-progress';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';
import PlaceIcon from 'material-ui/lib/svg-icons/maps/place';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Firebase from 'Firebase';

const styles = {
  buttonWrapper: {
    textAlign: 'right',
    width: '100%'
  },

  button: {
    margin: 15,
  }
};

const myFirebaseRef = new Firebase('https://granulr.firebaseio.com/'); 

class EntityDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchEntity(this.props.params.id);
  }

  componentWillUpdate(nextProps, nextState) {
    myFirebaseRef.child('userId').on("value", function(snapshot) {
       console.log(snapshot.val());
    });
  }

  setUserListingsToFirebase() {
    if (this.props.auth.isAuthenticated && this.props.auth.userProfile) {
      var userId = {},
          userId = this.props.auth.userProfile.user_id;
      
      var currentUserName = this.props.auth.userProfile.name;
      var entityId = this.props.entity[0].nid;
      var entityTitle = this.props.entity[0].title;

      console.log(userId, currentUserName, entityId, entityTitle);


      myFirebaseRef.child('users').child(userId).set({
        name: currentUserName,
        entities: [{
          nid: entityId,
          title: entityTitle
        }]
      });

      var entitiesRef = myFirebaseRef.child('users').child(userId).child('entities');
      entitiesRef.push({ nid: entityId, title: entityTitle});

    }
    else {
      console.log('you must be logged in to add to my events');
    }
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
              <strong>Date</strong>: {entity[0].date.value}<br/>
              <strong>Location</strong>: {entity[0].location.title}<br/><br/>
              {entity[0].description.value} <br/>
            </CardText>
        </Card>

        <div style={styles.buttonWrapper}>
          <RaisedButton
            label="My Events"
            linkButton={true}
            onMouseUp={this.setUserListingsToFirebase.bind(this)}
            onTouchStart={this.setUserListingsToFirebase.bind(this)}
            secondary={true}
            style={styles.button}
            icon={<AddIcon/>}
          />

          <RaisedButton
            label="Location"
            linkButton={true}
            href={'/locations/' + entity[0].location.nid}
            secondary={true}
            style={styles.button}
            icon={<PlaceIcon/>}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    entity: state.entities.activeEntity,
    auth: state.auth
   };
}

export default connect(mapStateToProps, { fetchEntity })(EntityDetails);

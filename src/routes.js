import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import EntityListingsContainer from './containers/EntityListingsContainer';
import EntityDetails from './components/entityDetails';
import Locations from './components/locationsMap';
import LocationDetails from './components/locationDetails';
import LocationsContainer from './containers/locationsContainer';
import LocationContainer from './containers/locationContainer';
import ConfigContainer from './containers/configContainer';
import UserListings from './components/userListings';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EntityListingsContainer} />
    <Route path="entity/:id" component={EntityDetails} />
    <Route path="locations" component={LocationsContainer} />
    <Route path="locations/:id" component={LocationContainer} />
    <Route path="locations/:id/details" component={LocationDetails} />
    <Route path="locations/:id/details/:entity" component={LocationDetails} />
  	<Route path="user-entities" component={UserListings} />
  </Route>
);

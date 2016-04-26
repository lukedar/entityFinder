import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import EntityListings from './components/entityListings';
import EntityDetails from './components/entityDetails';
import Locations from './components/locationsMap';
import LocationDetails from './components/locationDetails';
import LocationsContainer from './containers/locationsContainer';
import LocationContainer from './containers/locationContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EntityListings} />
    <Route path="entity/:id" component={EntityDetails} />
    <Route path="locations" component={LocationsContainer} />
    <Route path="locations/:id" component={LocationContainer} />
    <Route path="locations/:id/details" component={LocationDetails} />
  </Route>
);

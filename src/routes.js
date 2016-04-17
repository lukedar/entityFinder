import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import EntityListings from './components/entity_listings';
import EntityDetails from './components/entity_details';
import Locations from './components/locations';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={EntityListings} />
    <Route path="entity/:id" component={EntityDetails} />
    <Route path='locations' component={Locations} />

  </Route>
);

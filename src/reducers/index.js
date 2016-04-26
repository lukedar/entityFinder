import { combineReducers } from 'redux';
import EntitiesReducer from './entitiesReducer';
import LocationsReducer from './locationsReducer';
import EntitiesByLocation from './entitiesByLocationReducer';

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  locations: LocationsReducer,
  entitiesByLocation: EntitiesByLocation
});

export default rootReducer;

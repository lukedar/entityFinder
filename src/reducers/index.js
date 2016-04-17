import { combineReducers } from 'redux';
import EntitiesReducer from './reducer_entities';
import LocationsReducer from './reducer_locations';
import EntitiesByLocation from './reducer_entitiesByLocation';

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  locations: LocationsReducer,
  entitiesByLocation: EntitiesByLocation
});

export default rootReducer;

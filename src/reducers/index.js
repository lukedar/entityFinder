import { combineReducers } from 'redux';
import EntitiesReducer from './reducer_entities';
import LocationsReducer from './reducer_locations';

const rootReducer = combineReducers({
  entities: EntitiesReducer,
  locations: LocationsReducer
});

export default rootReducer;

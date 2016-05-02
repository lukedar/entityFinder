import { combineReducers } from 'redux';
import EntitiesReducer from './entitiesReducer';
import LocationsReducer from './locationsReducer';
import EntitiesByLocation from './entitiesByLocationReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  entities: EntitiesReducer,
  locations: LocationsReducer,
  entitiesByLocation: EntitiesByLocation,
  auth: authReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import EntitiesReducer from './entitiesReducer';
import LocationsReducer from './locationsReducer';
import EntitiesByLocation from './entitiesByLocationReducer';
import AuthReducer from './authReducer';
import ConfigReducer from './configReducer';

const rootReducer = combineReducers({
	config: ConfigReducer,
  entities: EntitiesReducer,
  locations: LocationsReducer,
  entitiesByLocation: EntitiesByLocation,
  auth: AuthReducer
});

export default rootReducer;

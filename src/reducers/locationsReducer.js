import { FETCH_LOCATIONS, FETCH_LOCATION, FETCH_ENTITIES_BY_LOCATION } from '../actions/index';

const INITIAL_STATE = { items: [], activeLocation: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
	  case FETCH_LOCATIONS:
	    return { 
	    	...state, 
	    	items: action.payload.data 
	    };

	  case FETCH_LOCATION:
	    return { 
	    	...state, 
	    	activeLocation: action.payload.data 
	    };

	   case FETCH_ENTITIES_BY_LOCATION:
	    return { 
	    	...state, 
	    	locationEntities: action.payload.data 
	    };
	    
	  default:
	    return state;
  }
}

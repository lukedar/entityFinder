import { FETCH_ENTITIES_BY_LOCATION } from '../actions/index';

const INITIAL_STATE = { entities: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
	  case FETCH_ENTITIES_BY_LOCATION:
	    return { 
	    	...state, 
	    	entities: action.payload.data 
	    };
	    
	  default:
	    return state;
  }
}

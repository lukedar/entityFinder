import { FETCH_ENTITIES, FETCH_ENTITY } from '../actions/index';

const INITIAL_STATE = { items: [], activeEntity: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
	  case FETCH_ENTITIES:
	    return { 
	    	...state, 
	    	items: action.payload.data 
	   };

	  case FETCH_ENTITY:
	  	return { 
	    	...state, 
	    	activeEntity: action.payload.data 
	  };
	    
	  default:
	    return state;
  }
}

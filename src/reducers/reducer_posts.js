import { FETCH_ENTITIES, FETCH_ENTITY } from '../actions/index';

const INITIAL_STATE = { all: [], activeEntity: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
	  case FETCH_ENTITY:
	    return { 
	    	...state, 
	    	activeEntity: action.payload.data 
	    };

	  case FETCH_ENTITIES:
	    return { 
	    	...state, 
	    	all: action.payload.data 
	    };


	  // case FETCH_LOCATIONS:
	  //   return { 
	  //   	...state, 
	  //   	locations: action.payload.data 
	  //   };
	  
	  default:
	    return state;
  }
}

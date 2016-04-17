import { FETCH_LOCATIONS } from '../actions/index';

const INITIAL_STATE = { all: [], activeLocation: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
	  // case FETCH_ENTITY:
	  //   return { 
	  //   	...state, 
	  //   	activeEntity: action.payload.data 
	  //   };

	  case FETCH_LOCATIONS:
	    return { 
	    	...state, 
	    	all: action.payload.data 
	    };
	    
	  default:
	    return state;
  }
}

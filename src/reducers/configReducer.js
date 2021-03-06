import { FETCH_CONFIG } from '../actions/index';

const INITIAL_STATE = { appConfig: {}};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CONFIG:
      return Object.assign({}, state, {
        appConfig: action.payload.data,
      })

    default:
      return state;
  }
}


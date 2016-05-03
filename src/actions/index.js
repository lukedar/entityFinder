import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export const FETCH_ENTITY = 'FETCH_ENTITY';
export const FETCH_ENTITIES_BY_LOCATION = 'FETCH_ENTITIES_BY_LOCATION';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS'
export const FETCH_LOCATION = 'FETCH_LOCATION';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const ENTITIES_URL = 'http://entity-cms.local/api/v1/entities';
const LOCATIONS_URL = 'http://entity-cms.local/api/v1/locations';


export function fetchEntities() {
  const request = axios.get(ENTITIES_URL);

  return {
    type: FETCH_ENTITIES,
    payload: request
  };
}

export function fetchEntity(id) {
  const request = axios.get(`${ENTITIES_URL}/?nid=${id}`);

  return {
    type: FETCH_ENTITY,
    payload: request
  };
}

export function fetchEntitiesByLocation(id) {
  const request = axios.get(`${ENTITIES_URL}/?location=${id}`);

  return {
    type: FETCH_ENTITIES_BY_LOCATION,
    payload: request
  };
}

export function fetchLocations() {
  const request = axios.get(LOCATIONS_URL);
  
  return {
    type: FETCH_LOCATIONS,
    payload: request
  };
}

export function fetchLocation(id) {
  const request = axios.get(`${LOCATIONS_URL}/?nid=${id}`);

  return {
    type: FETCH_LOCATION,
    payload: request
  };
}

// Authentication
export function receiveLogin(action) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    idToken: action.idToken,
    userProfile: action.userProfile
  }
}
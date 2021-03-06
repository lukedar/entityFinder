import axios from 'axios';

export const FETCH_CONFIG = 'FETCH_CONFIG';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export const FETCH_ENTITY = 'FETCH_ENTITY';
export const FETCH_ENTITIES_BY_LOCATION = 'FETCH_ENTITIES_BY_LOCATION';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS'
export const FETCH_LOCATION = 'FETCH_LOCATION';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';


const CONFIG_URL = 'http://entity-cms.local/api/v1/app-config';
const ENTITIES_URL = 'http://entity-cms.local/api/v1/entities';
const LOCATIONS_URL = 'http://entity-cms.local/api/v1/locations';


export function fetchConfig() {
  const request = axios.get(CONFIG_URL);
  console.log('fetching config request', request);

  return {
    type: FETCH_CONFIG,
    payload: request
  };
}


function myAsyncAction() {
   return dispatch => new Promise((resolve, reject) => {
      request().then((response) => {
         dispatch({type: SOME_ACTION, value: response.value});
         resolve(response);
      });
   });
}


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

// Authentication
export function logoutUser(action) {
  return {
    type: LOGOUT_USER,
    isAuthenticated: false,
    idToken: null,
    userProfile: null
  }
}

export function getUserRelatedEntities() {

}
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
export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://localhost:3001/sessions/create', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)
          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}
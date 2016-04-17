import axios from 'axios';

export const FETCH_ENTITIES = 'FETCH_ENTITIES';
export const FETCH_ENTITY = 'FETCH_ENTITY';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS'
export const FETCH_LOCATION = 'FETCH_LOCATION'

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
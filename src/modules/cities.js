import { fetchCollection } from 'redux-crud-store';

const MODEL = 'cities';
const PATH = '/cities';

export function fetchCities(params = {}) {
  return fetchCollection(MODEL, PATH, params);
}

import {
    fetchCollection, fetchRecord, createRecord, updateRecord, deleteRecord
} from 'redux-crud-store';

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  //eslint-disable-next-line
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

export const USER = createRequestTypes('USER');
export const REPO = createRequestTypes('REPO');
export const STARRED = createRequestTypes('STARRED');
export const STARGAZERS = createRequestTypes('STARGAZERS');

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE';
export const NAVIGATE = 'NAVIGATE';
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';
export const LOAD_REPO_PAGE = 'LOAD_REPO_PAGE';
export const LOAD_MORE_STARRED = 'LOAD_MORE_STARRED';
export const LOAD_MORE_STARGAZERS = 'LOAD_MORE_STARGAZERS';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

function action(type, payload = {}) {
  return { type, ...payload };
}

export const user = {
  request: (login) => action(USER.REQUEST, { login }),
  success: (login, response) => action(USER.SUCCESS, { login, response }),
  failure: (login, error) => action(USER.FAILURE, { login, error }),
};

export const repo = {
  request: (fullName) => action(REPO.REQUEST, { fullName }),
  success: (fullName, response) => action(REPO.SUCCESS, { fullName, response }),
  failure: (fullName, error) => action(REPO.FAILURE, { fullName, error }),
};

export const starred = {
  request: (login) => action(STARRED.REQUEST, { login }),
  success: (login, response) => action(STARRED.SUCCESS, { login, response }),
  failure: (login, error) => action(STARRED.FAILURE, { login, error }),
};

export const stargazers = {
  request: (fullName) => action(STARGAZERS.REQUEST, { fullName }),
  success: (fullName, response) => action(STARGAZERS.SUCCESS, { fullName, response }),
  failure: (fullName, error) => action(STARGAZERS.FAILURE, { fullName, error }),
};

export const updateRouterState = (state) => action(UPDATE_ROUTER_STATE, { state });
export const navigate = (pathname) => action(NAVIGATE, { pathname });
export const loadUserPage = (login, requiredFields = []) => {
  const payload = { login, requiredFields };
  return action(LOAD_USER_PAGE, payload);
};
export const loadRepoPage = (fullName, requiredFields = []) => {
  const payload = { fullName, requiredFields };
  return action(LOAD_REPO_PAGE, payload);
};
export const loadMoreStarred = (login) => action(LOAD_MORE_STARRED, { login });
export const loadMoreStargazers = (fullName) => action(LOAD_MORE_STARGAZERS, { fullName });

export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE);

const MODEL = 'cities';
const PATH = '/cities';

export function fetchCities(params = {}) {
  return fetchCollection(MODEL, PATH, params);
}

export function fetchCity(id, params = {}) {
  return fetchRecord(MODEL, id, `${PATH}/${id}`, params);
}

export function createCity(data = {}) {
  return createRecord(MODEL, PATH, data);
}

export function updateCity(id, data = {}) {
  return updateRecord(MODEL, id, `${PATH}/${id}`, data);
}

export function deleteCity(id) {
  return deleteRecord(MODEL, id, `${PATH}/${id}`);
}

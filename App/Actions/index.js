import {CALL_API, getJSON} from 'redux-api-middleware';


// Settings

export const APP_LOADED = 'APP_LOADED';
export function appLoaded() {
  return {
    type: APP_LOADED
  };
};


// Auth

export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_FAILURE = 'FETCH_TOKEN_FAILURE';
export function fetchToken(data) {
  return {
    [CALL_API]: {
      endpoint: 'https://github.com/login/oauth/access_token',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(data),
      types: [FETCH_TOKEN_REQUEST, {
        type: FETCH_TOKEN_SUCCESS,
        payload: (action, state, res) => getJSON(res)
      }, {
        type: FETCH_TOKEN_FAILURE,
        payload: (action, state, res) => getJSON(res)
      }]
    }
  };
};


// Notifications

export const FETCH_NOTIFICATIONS_REQUEST = 'FETCH_NOTIFICATIONS_REQUEST';
export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE';
export function fetchNotifications(isReFetching = false) {
  return {
    [CALL_API]: {
      endpoint: 'https://api.github.com/notifications',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      types: [
        {
          type: FETCH_NOTIFICATIONS_REQUEST,
          meta: { isReFetching }
        },
        {
          type: FETCH_NOTIFICATIONS_SUCCESS,
          meta: { isReFetching },
          payload: (action, state, res) => getJSON(res)
        },
        {
          type: FETCH_NOTIFICATIONS_FAILURE,
          meta: { isReFetching }
        }
      ]
    }
  };
};
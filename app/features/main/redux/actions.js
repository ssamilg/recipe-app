import * as types from './types';

export function setUserCredentials(user) {
  return {
    type: types.SET_USER_CREDENTIALS,
    user,
  };
}

export function setIsNewUser(payload) {
  return {
    type: types.SET_IS_NEW_USER,
    payload,
  };
}

export function setAuthStatus(payload) {
  return {
    type: types.SETH_AUTH_STATUS,
    payload,
  };
}

export function logout() {
  return {
    type: types.ON_LOGOUT,
  };
}

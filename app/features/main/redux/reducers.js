import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
  user: {},
  isNewUser: false,
  isLoggedIn: false,
};

export const mainReducer = createReducer(initialState, {
  [types.SET_USER_CREDENTIALS](draft, action) {
    console.log(action);
    draft.user = action.user;
  },
  [types.SET_IS_NEW_USER](draft, action) {
    draft.isNewUser = action.payload;
  },
  [types.SETH_AUTH_STATUS](draft, action) {
    draft.isLoggedIn = action.payload;
  },
  [types.ON_LOGOUT](draft, action) {
    draft.isLoggedIn = false;
    draft.user = [];
  },
});

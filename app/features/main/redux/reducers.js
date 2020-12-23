import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
  user: {},
  isNewUser: false,
  isLoggedIn: false,
  recipe: {},
};

// State yonetimi icin reducerlar tanimlandi

export const mainReducer = createReducer(initialState, {
  [types.SET_USER_CREDENTIALS](draft, action) {
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
  [types.REFRESH_RECIPE](draft, action) {
    draft.recipe = action.payload;
  },
});

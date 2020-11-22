import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from './reducers'; // where reducers is a object of reducers

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer'],
  debug: true, //to get useful logging
};

const middleware = [];

middleware.push(thunk);

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
// const initialState = {};
const persistConfig = { enhancers };
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureStore = () => {
  return { persistor, store };
};

export default configureStore;

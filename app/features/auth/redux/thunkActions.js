import auth from '@react-native-firebase/auth';

export function loginThunk(username, password) {
  return async function(dispatch, getState) {
    return auth().signInWithEmailAndPassword(username, password);
  };
}

export function registerThunk(email, password) {
  return async function(dispatch, getState) {
    return auth().createUserWithEmailAndPassword(email, password);
  };
}

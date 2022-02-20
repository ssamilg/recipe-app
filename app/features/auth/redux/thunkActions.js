import auth from '@react-native-firebase/auth';

export function loginThunk(email, password) {
  return async function(dispatch, getState) {
    return auth().signInWithEmailAndPassword(email, password);
  };
}

export function registerThunk(email, password) {
  return async function(dispatch, getState) {
    return auth().createUserWithEmailAndPassword(email, password);
  };
}

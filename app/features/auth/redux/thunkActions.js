import auth from '@react-native-firebase/auth';

// Firebase'e girilen email ve şifre ile login istegi atan method 
export function loginThunk(email, password) {
  return async function(dispatch, getState) {
    return auth().signInWithEmailAndPassword(email, password);
  };
}

// Firebase'e girilen email ve şifre ile register istegi atan method 
export function registerThunk(email, password) {
  return async function(dispatch, getState) {
    return auth().createUserWithEmailAndPassword(email, password);
  };
}

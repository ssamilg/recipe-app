import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { navigationRef } from './NavigationService';
import {
  setUserCredentials,
  setAuthStatus,
} from '../features/main/redux/actions';
import Login from '~/features/auth/containers';
import Register from '~/features/auth/containers/Register';
import Main from '~/features/main/containers';

const Stack = createStackNavigator();

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.mainReducer.isLoggedIn);

  function onAuthStateChanged(user) {
    if (user) {
      dispatch(setUserCredentials(user._user));
      dispatch(setAuthStatus(true));
    } else {
      dispatch(setUserCredentials({}));
      dispatch(setAuthStatus(false));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        {isLoggedIn ? (
          <Stack.Screen name="Main" component={Main} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

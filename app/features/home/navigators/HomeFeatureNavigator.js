import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import AppHeader from '../../main/components/AppHeader';
import Home from '../containers/index';
import NewRecipe from '../containers/NewRecipe';

const Stack = createStackNavigator();

function HomeFeatureNavigator() {
  return (
    <Stack.Navigator
      /* screenOptions={{
        header: props => <AppHeader {...props} />,
      }} */>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'homeStartTitle',
          subtitle: 'etUserRegistrationSubject',
          showBackButton: false,
        }}
      />
      <Stack.Screen
        name="NewRecipe"
        component={NewRecipe}
        options={{
          title: 'New Recipe',
          showBackButton: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeFeatureNavigator;

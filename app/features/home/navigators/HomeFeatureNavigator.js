// Bu dosyada kullanilacak elementler import edildi 
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../containers/index';
import NewRecipe from '../containers/NewRecipe';
import RecipeDetails from '../containers/RecipeDetails';

// Stack navigator olusturuldu
const Stack = createStackNavigator();

function HomeFeatureNavigator() {
  return (
    // Ana ekranlarimiz navigatore tanimlandi
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Tariflerim',
          subtitle: 'etUserRegistrationSubject',
          showBackButton: false,
        }}
      />
      <Stack.Screen
        name="NewRecipe"
        component={NewRecipe}
        options={{
          title: 'Yeni Tarif',
          showBackButton: false,
        }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{
          title: 'Tarif Detayları',
          showBackButton: false,
        }}
      />
    </Stack.Navigator>
  );
}

// Stack navigator export edildi
export default HomeFeatureNavigator;

import React from 'react';
import { Text } from 'react-native';
import MainDrawerNavigator from '../navigators';

function Main() {
  console.log('burda');
  return false ? <Text>Yakında</Text> : <MainDrawerNavigator />;
}

export default Main;

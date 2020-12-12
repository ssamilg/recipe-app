import React from 'react';
import { Text } from 'react-native';
import MainDrawerNavigator from '../navigators';

function Main() {
  return false ? <Text>Yakında</Text> : <MainDrawerNavigator />;
}

export default Main;

// Drawer navigation temel olarak tanimlandı ancak projede ana olarak stack navigator kullanildi
import React, { useState, useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeFeature from '~/features/home/navigators';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
  const [screenOptions] = useState([
    {
      name: 'Home',
      title: 'Home',
      icon: 'home',
      iconType: 'default',
      component: HomeFeature,
    },
  ]);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      useNativeAnimations={false}>
      {screenOptions.map((screen, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={{
              title: screen.title,
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  initialLoading: loading => ({
    width: loading ? 0 : 280,
  }),
});

// Drawer navigation export edildi
export default MainDrawerNavigator;

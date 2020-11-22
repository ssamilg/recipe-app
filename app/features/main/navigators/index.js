import React, { useState, useEffect, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeFeature from '~/features/home/containers';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

/* function MenuIcon({ icon, iconType }) {
  const size = 24;

  if (iconType === 'community') {
    return <CommunityIcon name={icon} size={size} color={color} />;
  }

  return <Icon name={icon} size={size} color={color} />;
} */

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
      /* drawerContent={props => <AppDrawer screens {...props} />} */
      /* drawerContentOptions={{
        activeTintColor: primary,
      }} */
      /* drawerStyle={styles.initialLoading(isDrawerLoading)} */
      useNativeAnimations={false}>
      {screenOptions.map((screen, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={{
              /* drawerIcon: () => (
                <MenuIcon icon={screen.icon} iconType={screen.iconType} />
              ), */
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

export default MainDrawerNavigator;

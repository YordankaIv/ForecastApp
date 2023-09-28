import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import OfflinePage from '../screens/OfflinePage/OfflinePage';

const Stack = createStackNavigator();

const MainNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={Home} />
    </Stack.Navigator>
  );
};

const NoConnectionNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.OfflinePage}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.OfflinePage} component={OfflinePage} />
    </Stack.Navigator>
  );
};

export {MainNavigation, NoConnectionNavigation};

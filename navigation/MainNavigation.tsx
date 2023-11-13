import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';
import Registration from '../screens/Registration/Registration';
import Login from '../screens/Login/Login';
import Locations from '../screens/Locations/Locations';

const Stack = createStackNavigator();

const NonAuthenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Login}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Registration} component={Registration} />
    </Stack.Navigator>
  );
};

const Authenticated = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={ScreenWrapper(Home)} />
      <Stack.Screen
        name={Routes.Locations}
        component={ScreenWrapper(Locations)}
      />
    </Stack.Navigator>
  );
};

export {NonAuthenticated, Authenticated};

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';

const Stack = createStackNavigator();

const MainNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={ScreenWrapper(Home)} />
    </Stack.Navigator>
  );
};

export default MainNavigation;

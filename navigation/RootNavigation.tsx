import React from 'react';
import {MainNavigation, NoConnectionNavigation} from './MainNavigation';
import {useNetInfo} from '@react-native-community/netinfo';

const RootNavigation = () => {
  const netInfo = useNetInfo();

  return netInfo.isConnected && netInfo.isInternetReachable ? (
    <MainNavigation />
  ) : (
    <NoConnectionNavigation />
  );
};

export default RootNavigation;

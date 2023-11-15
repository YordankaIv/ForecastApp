import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import OfflinePage from '../OfflinePage/OfflinePage';

const ScreenWrapper = (WrappedComponent: React.FC) => {
  const netInfo = useNetInfo();

  // return () => {
  return (
    <>
      {netInfo.isConnected && netInfo.isInternetReachable ? (
        <WrappedComponent />
      ) : (
        <OfflinePage />
      )}
    </>
  );
  // };
};

export default ScreenWrapper;

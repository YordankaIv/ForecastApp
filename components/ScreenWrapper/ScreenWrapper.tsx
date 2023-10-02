import React from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import OfflinePage from '../OfflinePage/OfflinePage';

const ScreenWrapper = (WrappedComponent: React.FC<{}>) => {
  const netInfo = useNetInfo();

  return props => {
    return (
      <>
        {netInfo.isConnected && netInfo.isInternetReachable ? (
          <WrappedComponent {...props} />
        ) : (
          <OfflinePage />
        )}
      </>
    );
  };
};

export default ScreenWrapper;

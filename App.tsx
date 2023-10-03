import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import MainNavigation from './navigation/MainNavigation';
import {StatusBar} from 'react-native';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent={true}
      />
      <QueryClientProvider client={queryClient}>
        <MainNavigation />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;

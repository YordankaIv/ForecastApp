import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './navigation/MainNavigation';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MainNavigation />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;

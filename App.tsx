import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import MainNavigation from './navigation/MainNavigation';

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

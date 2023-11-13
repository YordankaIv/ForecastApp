import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {StatusBar} from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor="transparent"
            barStyle={'dark-content'}
            translucent={true}
          />
          <QueryClientProvider client={queryClient}>
            <RootNavigation />
          </QueryClientProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

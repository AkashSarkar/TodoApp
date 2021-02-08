import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import AppNavigator from './src/routes';
import store from './src/store';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  </Provider>
);

export default App;

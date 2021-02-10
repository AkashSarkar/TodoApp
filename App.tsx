import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Provider, useSelector } from 'react-redux';
import AppNavigator from './src/routes';
import store from './src/store';
import RootContainer from './src/RootContainer';

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootContainer>
          <AppNavigator />
        </RootContainer>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

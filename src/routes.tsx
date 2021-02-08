import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './components/TodoList';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="ToDoList"
    headerMode="none"
  >
    <Stack.Screen name="ToDoList" component={TodoList} />
  </Stack.Navigator>
);
export default AppNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/modifyTodo/AddTodo';
import TodoDetails from './components/TodoList/TodoDetails';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    initialRouteName="ToDoList"
    headerMode="none"
  >
    <Stack.Screen name="ToDoList" component={TodoList} />
    <Stack.Screen name="TodoDetails" component={TodoDetails} />
    <Stack.Screen name="AddTodo" component={AddTodo} />
  </Stack.Navigator>
);
export default AppNavigator;

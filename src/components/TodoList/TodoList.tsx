import React, { useEffect } from 'react';
import {
  Image, StatusBar, StyleSheet, Text, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../../assets';
import { colors, gradientColors } from '../../baseColor';
import TodoListItem from './TodoListItem';
import { fetchTodos } from '../TodoSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary3
  },
  topContainer: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 30
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.surface1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 18
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.surface1,
    marginBottom: 5
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.background
  }
});
const TodoList = ({ navigation }) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos.data);
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  const mapTodos = (): Array<Object> => {
    if (todos.length !== 0) {
      return todos.items.map((item) => (
        {
          id: item.id,
          title: item.title,
          description: item.description,
          deadline: item.deadline,
          completed: item.completed
        }
      ));
    }
    return [];
  };
  const renderTodoItem = () => (
    mapTodos().map((item, idx) => (
      <View style={{ marginBottom: 30 }}>
        <TodoListItem
          gradient={gradientColors[idx % 2]}
          complete={item.completed}
          id={item.id}
          title={item.title}
          description={item.description}
          deadline={item.deadline}
          navigation={navigation}
        />
      </View>
    ))
  )
  return (
    <View style={styles.container}>
      <SafeAreaView backgroundColor={colors.primary3} />
      <StatusBar
        backgroundColor={colors.primary3}
        barStyle="dark-content"
      />
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.title}>ALL</Text>
          <Text style={styles.subtitle}>15 tasks</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTodo')}
        >
          <Image source={assets.add} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        {renderTodoItem()}
      </View>
    </View>
  );
};
export default TodoList;

import React, { useEffect } from 'react';
import {
  FlatList,
  Image, StatusBar, StyleSheet, Text, View, ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../../assets';
import { colors, gradientColors } from '../../baseColor';
import TodoListItem from './TodoListItem';
import { fetchTodos, fetchMoreTodos } from '../TodoSlice';

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
  const meta = useSelector(state => state.todo.todos.meta);
  const isLoading = useSelector(state => state.todo.todos.isLoading);
  useEffect(() => {
    dispatch(fetchTodos(1));
  }, []);
  const mapTodos = (): Array<Object> => {
    if (todos && todos.length !== 0) {
      // sort array
      const sorted = todos.slice().sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
      // map the sorted array
      return sorted.map((item) => (
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
  const loadMore = () => {
    let page = meta ? meta.currentPage : 1;
    if (page < meta.totalPages) {
      page += 1;
      dispatch(fetchMoreTodos(page));
    }
  };
  const renderFooter = () => {
    if (meta && meta.currentPage === meta.totalPages) return null;
    return (
      <ActivityIndicator animating size="large" />
    );
  }
  const onRefresh = () => {
    dispatch(fetchTodos(1));
  }
  const renderTodoItem = () => (
    <FlatList
      data={mapTodos()}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 30 }} key={item.id}>
          <TodoListItem
            gradient={gradientColors[item.id % 2]}
            complete={item.completed}
            id={item.id}
            title={item.title}
            description={item.description}
            deadline={item.deadline}
            navigation={navigation}
          />
        </View>
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      initialNumToRender={10}
      ListFooterComponent={renderFooter}
      onRefresh={onRefresh}
      refreshing={isLoading}
    />
  );
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
          <Text style={styles.subtitle}>{todos && todos.length ? todos.length : 0} tasks</Text>
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

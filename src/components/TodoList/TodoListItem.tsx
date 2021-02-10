import React, { FC, useEffect } from 'react';
import {
  Image, StyleSheet, Text, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { assets } from '../../assets';
import { colors } from '../../baseColor';
import { fetchTodo, updateTodo } from '../TodoSlice';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 100,
    borderRadius: 16,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    height: 26,
    width: 26,
    borderWidth: 1,
    borderRadius: 13,
    borderColor: '#DFDFE0',
    backgroundColor: colors.surface1
  },
  title: {
    fontSize: 14,
    color: colors.primary3,
    fontWeight: '600',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: colors.primary2,
    fontWeight: '500',
    marginBottom: 10
  },
  deadline: {
    fontSize: 14,
    color: '#A9ADB0',
    fontWeight: '500'
  }
});

interface TodoItemProps {
  gradient: Array<string>,
  complete: boolean,
  id: number,
  title: string,
  description: string,
  deadline: string
}
const TodoListItem: FC<TodoItemProps> = ({
  gradient, complete, id, title, description, deadline, navigation
}: TodoItemProps) => {
  const dispatch = useDispatch();
  const todoData = useSelector(state => state.todo.todo);
  const handleRedirect = () => {
    dispatch(fetchTodo(id));
  };
  const handleComplete = () => {
    const payload = {
      title,
      description,
      deadline,
      completed: !complete
    };
    dispatch(updateTodo(id, payload));
  };
  useEffect(() => {
    if (todoData.success) {
      navigation.navigate('TodoDetails');
    }
  }, [todoData]);
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={gradient}
      style={styles.wrapper}
    >
      <View style={styles.leftWrapper}>
        <TouchableOpacity
          onPress={() => handleComplete()}
        >
          {complete ?
            (
              <Image source={assets.complete} style={{ height: 25, width: 25 }} />
            )
            :
            (
              <View style={styles.circle} />
            )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => handleRedirect()}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.deadline}>{deadline}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image source={assets.info} style={{ height: 25, width: 25 }} />
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default TodoListItem;

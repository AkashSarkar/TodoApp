import React, { FC, useEffect, useState } from 'react';
import {
  Image, StyleSheet, Text, View, Platform, LayoutAnimation, UIManager,
  Alert, TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { assets } from '../../assets';
import { colors } from '../../baseColor';
import { truncate } from '../../util';
import { deleteTodo, fetchTodo, updateTodo } from '../TodoSlice';
if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
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
  },
  actionButtons: {
    height: 30,
    width: 80,
    backgroundColor: colors.surface1,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
  // states
  const [showActionBtns, setShowActionBtns] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const todoData = useSelector(state => state.todo.todo.success);
  const handleRedirect = () => {
    dispatch(fetchTodo(id));
    setIsDetails(true);
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
  /**
   * toggle action buttons
   */
  const toggleActionButtons = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        200,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
    setShowActionBtns(!showActionBtns);
  };
  /**
   * get data todo
   */
  const handleUpdate = () => {
    dispatch(fetchTodo(id));
    setIsEdit(true);
  };

  /**
   * delete todo
   */
  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };
  useEffect(() => {
    if (isEdit && todoData) {
      setIsEdit(false);
      navigation.navigate('EditTodo');
    } else if (isDetails && todoData) {
      setIsDetails(false);
      navigation.navigate('TodoDetails');
    }
  }, [todoData, isEdit, isDetails]);
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
          <Text style={styles.description}>{truncate(description, 22)}</Text>
          <Text style={styles.deadline}>{deadline}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => toggleActionButtons()}
      >
        <Image source={assets.info} style={{ height: 25, width: 25 }} />
      </TouchableOpacity>
      {showActionBtns && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Delete Todo',
                'Are you sure?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => { },
                    style: 'cancel'
                  },
                  { text: 'OK', onPress: () => handleDelete() }
                ],
                { cancelable: false }
              );
            }}
          >
            <Image source={assets.delete} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUpdate()}
          >
            <Image source={assets.edit} style={{ height: 25, width: 25 }} />
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};
export default TodoListItem;

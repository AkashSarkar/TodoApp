import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../baseColor';
import Wrapper from '../common/Wrapper';
import { fetchTodo } from '../TodoSlice';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 50
  },
  boxshadow: {
    height: 200,
    width: '100%',
    backgroundColor: '#E0E6E6',
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 30
  }
});
const TodoDetails = ({ navigation }) => {
  const todoData = useSelector(state => state.todo.todo.data);
  return (
    <Wrapper
      statusBarColor={colors.surface1}
      barStyle="dark-content"
      headerTitle="Todo Details"
      goBack={() => navigation.goBack()}
    >
      <View
        style={styles.container}
      >
        <View style={styles.boxshadow}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '500',
              color: colors.primary3
            }}
            >
              {todoData.title}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.primary2
              }}
            >
              {todoData.description}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.surface3
              }}
            >
              Deadline: {todoData.deadline}
            </Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.surface3
              }}
            >
              Completed: {todoData.completed ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};
export default TodoDetails;

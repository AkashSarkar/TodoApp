import React from 'react';
import {
  Image, StyleSheet, Text, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../assets';
import { colors, gradientColors } from '../baseColor';
import TodoListItem from './TodoListItem';

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
const TodoList = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView backgroundColor={colors.primary3} />
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.title}>ALL</Text>
          <Text style={styles.subtitle}>15 tasks</Text>
        </View>
        <TouchableOpacity>
          <Image source={assets.add} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TodoListItem
          gradient={gradientColors[0]}
          complete
          title="Buy food"
          description="Got to market and buy food"
          deadline="12/02/2021"
        />
        <TodoListItem
          gradient={gradientColors[1]}
          complete={false}
          title="Buy food"
          description="Got to market and buy food"
          deadline="12/02/2021"
        />
      </View>
    </View>
  );
};
export default TodoList;

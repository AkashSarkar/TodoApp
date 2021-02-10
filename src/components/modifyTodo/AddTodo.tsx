import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from '../../baseColor';
import InputField from '../common/InputField';
import Wrapper from '../common/Wrapper';
import { createTodo, clearCreateTodo } from '../TodoSlice';
import { useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30
  },
  label: {
    fontSize: 16,
    color: colors.primary2
  },
  date: {
    fontSize: 16,
    color: colors.surface3
  },
  submitBtn: {
    width: '100%',
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    width: 75,
    fontSize: 18,
    color: colors.surface1,
    fontWeight: '500'
  }
});
const AddTodo = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // subscribe to store
  const createTodoData = useSelector(state => state.todo.createTodo);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  /**
   * date selection
   * @param date
   */
  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };
  /**
   * handle validation
   */
  useEffect(() => {
    if (title && description && date) {
      setIsValidated(true);
    }
  }, [title, description, date]);
  /**
   * submit form
   */
  const handleSubmit = () => {
    const payload = {
      title,
      description,
      deadline: date
      // completed: false
    };
    dispatch(createTodo(payload));
  };
  /**
   * redirect if todo add success
   */
  useEffect(() => {
    if (createTodoData.success) {
      navigation.navigate('ToDoList');
    }
  }, [createTodoData]);
  /**
   * clear side effect after leaving page
   */
  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(clearCreateTodo());
      };
    }, [])
  );
  return (
    <Wrapper
      statusBarColor={colors.surface1}
      barStyle="dark-content"
      headerTitle="Add Todo"
      goBack={() => navigation.goBack()}
    >
      <KeyboardAwareScrollView
        resetScrollToCoords={{
          x: 0,
          y: 0
        }}
        scrollEnabled
        extraScrollHeight={50}
        contentContainerStyle={styles.container}
      >
        <View style={{ marginBottom: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Title</Text>
          </View>
          <InputField
            placeholder="Type here"
            placeholderTextColor={colors.surface3}
            value={title}
            onChangeText={(text: string) => setTitle(text)}
            validations={[
              {
                validationType: 'required',
                value: true,
                msg: 'This field is required'
              }
            ]}
            setIsValid={(valid) => {
            }}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Description</Text>
          </View>
          <InputField
            placeholder="What are you planning?"
            placeholderTextColor={colors.surface3}
            value={description}
            onChangeText={(text: string) => setDescription(text)}
            multiline
            numberOfLines={8}
            validations={[
              {
                validationType: 'required',
                value: true,
                msg: 'This field is required'
              }
            ]}
            setIsValid={(valid) => {
            }}
          />
        </View>
        <View
          style={{
            marginBottom: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Deadline</Text>
          </View>
          <TouchableOpacity
            onPress={() => showDatePicker()}
          >
            <Text style={styles.date}>
              {date ? date.toLocaleString('en-GB', { timeZone: 'UTC' }) : 'Select Date'}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <TouchableOpacity
          disabled={!isValidated}
          onPress={() => handleSubmit()}
          style={{ width: '100%' }}
        >
          <View style={[styles.submitBtn, { backgroundColor: isValidated ? colors.primary3 : '#D3A3F0' }]}>
            <Text style={styles.btnText}>
              Create
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};
export default AddTodo;

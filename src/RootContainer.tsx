import React, { useEffect } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { errorMessages } from './util/enum';

const RootContainer = ({ children }) => {
  const errorMsg = useSelector(state => state.todo.errorMsg.code);
  useEffect(() => {
    if (errorMsg) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessages[errorMsg],
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => { },
        onPress: () => { }
      });
    }
  }, [errorMsg]);
  return (
    <View style={{ flex: 1 }}>
      {children}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};
export default RootContainer;

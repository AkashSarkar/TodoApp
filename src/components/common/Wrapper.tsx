import React, { FC, ReactNode } from 'react';
import {
  View, SafeAreaView, StatusBar, StyleSheet, Text, Image,
  TouchableOpacity
} from 'react-native';
import { assets } from '../../assets';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 10
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500'
  },
  hitSlop: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  }
});
interface WrapperProps {
  statusBarColor: string,
  barStyle: string,
  headerTitle: string,
  children: ReactNode,
  goBack: Function
}
const Wrapper: FC<WrapperProps> = ({
  statusBarColor, barStyle, children, headerTitle,
  goBack
}: WrapperProps) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        backgroundColor={statusBarColor}
      />
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={barStyle}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={styles.hitSlop}
        >
          <Image source={assets.back} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{headerTitle}</Text>
        <TouchableOpacity
          onPress={goBack}
          hitSlop={styles.hitSlop}
        >
          <Image source={assets.cross} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}
export default Wrapper;

import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../baseColor';
import { validate } from '../../util';

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16
  }
});
interface validationObj {
  validationType: string,
  value: boolean,
  msg: string
}
interface inputProps {
  placeholder: string,
  placeholderTextColor: string,
  multiline?: boolean,
  numberOfLines?: number,
  validations: Array<validationObj>,
  setIsValid: Function,
  onChangeText: Function,
  value: string
}
const InputField: FC<inputProps> = (props: inputProps) => {
  const {
    validations, setIsValid, value, onChangeText
  } = props;
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const onValidate = () => new Promise((resolve, reject) => {
    try {
      if (validations.length < 0) return reject(false);
      let isInputValid = false;

      for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];
        isInputValid = validate(validation, value);
        if (isInputValid === false) {
          setErrorMsg(validation.msg);
          setIsValid(false);
          resolve(false);
          break;
        }
        if (i === validations.length - 1) {
          setErrorMsg('');
          setIsValid(true);
          resolve(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
  useEffect(() => {
    if (errorMsg.length > 0) {
      setShowErrorMsg(true);
    } else {
      setShowErrorMsg(false);
    }
  }, [errorMsg]);
  return (
    <View>
      <TextInput
        {...props}
        style={[
          styles.input,
          {
            height: props.multiline ? 80 : 40,
            borderColor: showErrorMsg ? 'red' : colors.surface3
          }
        ]}
        onBlur={() => onValidate()}
        onChangeText={onChangeText}
      />
      {showErrorMsg && (
        <Text
          style={{
            marginTop: 5,
            color: 'red',
            fontSize: 12
          }}
        >
          {errorMsg}
        </Text>
      )}
    </View>
  );
};
export default InputField;

import React, {ReactNode} from 'react';
import {TextInput, TextStyle} from 'react-native';

type InputFieldProps = {
  testID: string;
  value: string;
  placeholder: string;
  style: TextStyle;
  onChangeText: (text: string) => void;
};

const InputField = (props: InputFieldProps) => {
  const {testID, value, placeholder, style, onChangeText} = props;
  return (
    <TextInput
      testID={testID}
      value={value}
      placeholder={placeholder}
      style={style}
      onChangeText={onChangeText}
    />
  );
};

export default InputField;

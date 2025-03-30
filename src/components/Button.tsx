import React from 'react';
import {
  GestureResponderEvent,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type ButtonProps = {
  name: string;
  style: ViewStyle;
  textStyle: TextStyle;
  testID: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Button = (props: ButtonProps) => {
  const {name, style, textStyle, testID, onPress} = props;
  return (
    <TouchableOpacity testID={testID} style={style} onPress={onPress}>
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Button;

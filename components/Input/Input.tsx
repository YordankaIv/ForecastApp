import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import style from './style';
import {InputProps} from '../../types/CommonTypes';

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  const [value, setValue] = useState('');
  return (
    <View>
      <Text style={style.label}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder ? placeholder : undefined}
        style={style.input}
        value={value}
        onChangeText={val => {
          setValue(val);
          onChangeText(val);
        }}
      />
    </View>
  );
};

export default Input;
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {ButtonProps} from '../../types/CommonTypes';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  isDisabled = false,
}) => {
  return (
    <View>
      <Pressable
        disabled={isDisabled}
        onPress={() => onPress()}
        style={[style.button, isDisabled && style.disabled]}>
        <Text
          style={[
            style.title,
            globalStyle.RalewayFont,
            globalStyle.mediumWeight,
            globalStyle.MSize,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

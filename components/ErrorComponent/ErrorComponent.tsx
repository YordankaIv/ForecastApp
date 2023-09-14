import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {REFRESH_BUTTON} from '../../utils/constants';
import {ErrorComponentProps} from '../../types/WeatherTypes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWarning} from '@fortawesome/free-solid-svg-icons';

import style from './style';

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorText,
  onPress,
}) => (
  <View style={style.errorContainer}>
    <FontAwesomeIcon icon={faWarning} size={30} color={'#FF0000'} />
    <Text style={style.error}>{errorText}</Text>
    {onPress && (
      <Pressable onPress={() => onPress()} style={style.button}>
        <Text style={style.title}>{REFRESH_BUTTON}</Text>
      </Pressable>
    )}
  </View>
);

export default ErrorComponent;

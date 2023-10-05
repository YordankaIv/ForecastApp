import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {REFRESH_BUTTON} from '../../utils/constants';
import {ErrorComponentProps} from '../../types/WeatherTypes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWarning} from '@fortawesome/free-solid-svg-icons';
import {Colors} from '../../utils/colorsContants';

import style from './style';

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorText,
  onRefreshPress,
}) => (
  <View style={style.errorContainer}>
    <FontAwesomeIcon icon={faWarning} size={30} color={Colors.red} />
    <Text style={style.error}>{errorText}</Text>
    {onRefreshPress && (
      <Pressable onPress={() => onRefreshPress()} style={style.button}>
        <Text style={style.title}>{REFRESH_BUTTON}</Text>
      </Pressable>
    )}
  </View>
);

export default ErrorComponent;

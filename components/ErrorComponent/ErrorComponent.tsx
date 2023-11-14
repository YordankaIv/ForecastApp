import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {REFRESH_BUTTON} from '../../utils/constants';
import {ErrorComponentProps} from '../../types/WeatherTypes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faWarning} from '@fortawesome/free-solid-svg-icons';
import {Colors} from '../../utils/colorsConstants';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  errorText,
  onRefreshPress,
}) => (
  <View style={style.errorContainer}>
    <FontAwesomeIcon icon={faWarning} size={30} color={Colors.red} />
    <Text
      style={[
        style.error,
        globalStyle.RalewayFont,
        globalStyle.boldWeight,
        globalStyle.XLSize,
      ]}>
      {errorText}
    </Text>
    {onRefreshPress && (
      <Pressable onPress={() => onRefreshPress()} style={style.button}>
        <Text
          style={[
            style.title,
            globalStyle.RalewayFont,
            globalStyle.mediumWeight,
            globalStyle.MSize,
          ]}>
          {REFRESH_BUTTON}
        </Text>
      </Pressable>
    )}
  </View>
);

export default ErrorComponent;

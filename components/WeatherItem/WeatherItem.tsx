import React from 'react';
import {Text, View} from 'react-native';
import {WeatherItemProps} from '../../types/WeatherTypes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Colors} from '../../utils/colorsConstants';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const WeatherItem: React.FC<WeatherItemProps> = ({label, value, icon}) => {
  return (
    <View style={style.descriptionContainer}>
      <FontAwesomeIcon icon={icon} size={25} color={Colors.white} />
      <Text
        style={[
          style.whiteColor,
          globalStyle.RalewayFont,
          globalStyle.boldWeight,
          globalStyle.MSize,
        ]}>
        {label}
      </Text>
      <Text
        style={[
          style.whiteColor,
          globalStyle.RalewayFont,
          globalStyle.normalWeight,
          globalStyle.SSize,
        ]}>
        {value}
      </Text>
    </View>
  );
};

export default WeatherItem;

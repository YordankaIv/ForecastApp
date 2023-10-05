import React from 'react';
import {Text, View} from 'react-native';
import {WeatherItemProps} from '../../types/WeatherTypes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Colors} from '../../utils/colorsContants';

import style from './style';

const WeatherItem: React.FC<WeatherItemProps> = ({label, value, icon}) => {
  return (
    <View style={style.descriptionContainer}>
      <FontAwesomeIcon icon={icon} size={25} color={Colors.white} />
      <Text style={style.descriptionLabel}>{label}</Text>
      <Text style={style.descriptionValue}>{value}</Text>
    </View>
  );
};

export default WeatherItem;

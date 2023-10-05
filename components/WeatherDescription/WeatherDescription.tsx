import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {
  CELSIUS,
  CELSIUS_UNIT,
  CHANGE_UNIT_TEXT,
  FAHRENHEIT,
  TEMP_TEXT,
} from '../../utils/constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {WeatherDescriptionProps} from '../../types/WeatherTypes';
import {formatTemperature} from '../../utils/utils';
import {Colors} from '../../utils/colorsContants';

import style from './style';

const WeatherDescription: React.FC<WeatherDescriptionProps> = ({
  weather,
  unit,
  onChangeUnit,
}) => (
  <>
    <View style={style.detailsContainer}>
      <View style={style.locationContainer}>
        <Text style={style.location}>
          {weather.name}, {weather.sys.country}
        </Text>
        <FontAwesomeIcon icon={faLocationDot} size={12} color={Colors.white} />
      </View>

      <View style={style.tempDetailsContainer}>
        <Text style={style.tempDetails}>
          {formatTemperature(weather.main.temp_max, unit)} /
          {formatTemperature(weather.main.temp_min, unit)}
        </Text>
        <Text style={style.tempDetails}>
          {TEMP_TEXT} {formatTemperature(weather.main.feels_like, unit)}
        </Text>
      </View>
    </View>
    <Pressable onPress={() => onChangeUnit()} style={style.changeUnitContainer}>
      <Text style={style.changeUnit}>
        {CHANGE_UNIT_TEXT} {unit === CELSIUS_UNIT ? FAHRENHEIT : CELSIUS}
      </Text>
    </Pressable>
  </>
);

export default WeatherDescription;

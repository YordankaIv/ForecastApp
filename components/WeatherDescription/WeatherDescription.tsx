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
import {Colors} from '../../utils/colorsConstants';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const WeatherDescription: React.FC<WeatherDescriptionProps> = ({
  weather,
  unit,
  onChangeUnit,
}) => (
  <>
    <View style={style.detailsContainer}>
      <View style={style.locationContainer}>
        <Text
          style={[
            style.location,
            globalStyle.RalewayFont,
            globalStyle.bolderWeight,
            globalStyle.MSize,
          ]}>
          {weather.name}, {weather.sys.country}
        </Text>
        <FontAwesomeIcon icon={faLocationDot} size={12} color={Colors.white} />
      </View>

      <View style={style.tempDetailsContainer}>
        <Text
          style={[
            style.tempDetails,
            globalStyle.RalewayFont,
            globalStyle.bolderWeight,
            globalStyle.SSize,
          ]}>
          {formatTemperature(weather.main.temp_max, unit)} /
          {formatTemperature(weather.main.temp_min, unit)}
        </Text>
        <Text
          style={[
            style.tempDetails,
            globalStyle.bolderWeight,
            globalStyle.SSize,
          ]}>
          {TEMP_TEXT} {formatTemperature(weather.main.feels_like, unit)}
        </Text>
      </View>
    </View>
    <Pressable onPress={() => onChangeUnit()} style={style.changeUnitContainer}>
      <Text
        style={[
          style.changeUnit,
          globalStyle.RalewayFont,
          globalStyle.bolderWeight,
          globalStyle.MSize,
        ]}>
        {CHANGE_UNIT_TEXT} {unit === CELSIUS_UNIT ? FAHRENHEIT : CELSIUS}
      </Text>
    </Pressable>
  </>
);

export default WeatherDescription;

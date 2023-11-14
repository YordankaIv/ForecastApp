import React from 'react';
import {WeatherHeaderProps} from '../../types/WeatherTypes';
import {Image, Text, View} from 'react-native';
import {formatTemperature} from '../../utils/utils';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const WeatherHeader: React.FC<WeatherHeaderProps> = ({weather, unit}) => (
  <View style={style.weatherContainer}>
    <View>
      <Text
        style={[
          style.currentTemperature,
          globalStyle.RalewayFont,
          globalStyle.boldWeight,
          globalStyle.XXLSize,
        ]}>
        {formatTemperature(weather.main.temp, unit)}
      </Text>
      <Text
        style={[
          style.currentWeather,
          globalStyle.RalewayFont,
          globalStyle.normalWeight,
          globalStyle.LSize,
        ]}>
        {weather.weather[0].main}
      </Text>
    </View>
    <View style={style.imageContainer}>
      <Image
        source={{
          uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`,
        }}
        resizeMode={'cover'}
        style={style.icon}
      />
    </View>
  </View>
);
export default WeatherHeader;

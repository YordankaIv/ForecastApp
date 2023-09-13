import React from 'react';
import {WeatherHeaderProps} from '../../types/WeatherTypes';
import {Image, Text, View} from 'react-native';
import {formatTemperature} from '../../utils/utils';

import style from './style';

const WeatherHeader: React.FC<WeatherHeaderProps> = ({weatherData, unit}) => (
  <View style={style.weatherContainer}>
    <View>
      <Text style={style.currentTemperature}>
        {formatTemperature(weatherData.main.temp, unit)}
      </Text>
      <Text style={style.currentWeather}>{weatherData.weather[0].main}</Text>
    </View>
    <View style={style.imageContainer}>
      <Image
        source={{
          uri: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
        }}
        resizeMode={'cover'}
        style={style.icon}
      />
    </View>
  </View>
);
export default WeatherHeader;

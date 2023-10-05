import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {ActivityIndicator, Text, View} from 'react-native';
import {
  CELSIUS_UNIT,
  DATE_TIME_FORMAT,
  ERROR_FORECAST_TEXT,
  FAHRENHEIT_UNIT,
  M_S_METRIC,
  OPEN_WEATHER_MAP_APP_ID,
  OPEN_WEATHER_MAP_URL,
  PERCENT_METRIC,
  TIME_FORMAT,
} from '../../utils/constants';
import {Weather, WeatherComponentProps} from '../../types/WeatherTypes';
import WeatherItem from '../WeatherItem/WeatherItem';
import {weatherDetailsConstants} from '../../utils/weatherConstants';
import WeatherHeader from '../WeatherHeader/WeatherHeader';
import WeatherDescription from '../WeatherDescription/WeatherDescription';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import axios from 'axios';
import {useQuery} from 'react-query';
import 'react-native-url-polyfill/auto';

import style from './style';

const WeatherComponent: React.FC<WeatherComponentProps> = ({
  location,
  refreshing,
  getWeatherConditionId,
}) => {
  const openWeatherMap = new URL(OPEN_WEATHER_MAP_URL);
  const [unit, setUnit] = useState(CELSIUS_UNIT);
  const [weatherDetailsValues, setWeatherDetailsValues] = useState<
    Record<string, string>
  >({wind: '', humidity: '', sunrise: '', sunset: '', cloudiness: ''});

  const getCurrentWeather = async (metric: string) => {
    const locationParams = {
      lat: location.lat.toString(),
      lon: location.lon.toString(),
      units: metric,
      appid: OPEN_WEATHER_MAP_APP_ID,
    };
    openWeatherMap.search = new URLSearchParams(locationParams).toString();

    const currentWeatherUrl = openWeatherMap.toString();
    const {data: weatherCondition} = await axios.get(currentWeatherUrl);
    getWeatherConditionId(weatherCondition.weather[0].id);
    prepareWeatherDetails(weatherCondition);

    return weatherCondition;
  };

  const {
    isFetching,
    isError,
    error,
    data: weatherCondition,
    refetch,
  } = useQuery<Weather, Error>(['weather', unit], () =>
    getCurrentWeather(unit),
  );

  const formatTime = (time: number | string) => {
    let formatedTime = time.toString();
    if (typeof time === 'number') {
      formatedTime = moment.unix(time).format(TIME_FORMAT);
    }

    return formatedTime;
  };

  const currentDate = weatherCondition?.dt;

  const prepareWeatherDetails = (weather: Weather) => {
    const weatherValues = {
      wind: weather.wind.speed + M_S_METRIC,
      humidity: weather.main.humidity + PERCENT_METRIC,
      sunrise: formatTime(weather.sys.sunrise),
      sunset: formatTime(weather.sys.sunset),
      cloudiness: weather.clouds.all + PERCENT_METRIC,
    };

    setWeatherDetailsValues(weatherValues);
  };

  const handleChangeOfUnit = () => {
    const newUnit = unit === CELSIUS_UNIT ? FAHRENHEIT_UNIT : CELSIUS_UNIT;
    setUnit(newUnit);
  };

  return (
    <>
      {isFetching || refreshing ? (
        <View style={style.infoContainer}>
          {isError ? (
            <ErrorComponent
              errorText={error ? error.message : ERROR_FORECAST_TEXT}
              onRefreshPress={() => refetch()}
            />
          ) : (
            <View style={style.indicatorContainer}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      ) : (
        <>
          <>
            <Text style={style.dateAndTime}>
              {currentDate && moment.unix(currentDate).format(DATE_TIME_FORMAT)}
            </Text>
          </>
          {weatherCondition && (
            <>
              <WeatherHeader weather={weatherCondition} unit={unit} />
              <WeatherDescription
                weather={weatherCondition}
                unit={unit}
                onChangeUnit={handleChangeOfUnit}
              />
            </>
          )}

          <View style={style.weatherDescriptionDetails}>
            {weatherDetailsConstants.map((detail, index) => (
              <View key={index} style={style.weatherDescription}>
                {detail.map((description, detailIndex) => (
                  <WeatherItem
                    key={detailIndex + 'detail'}
                    icon={description.icon}
                    label={description.label}
                    value={
                      weatherDetailsValues[description.label.toLowerCase()]
                    }
                  />
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </>
  );
};

export default WeatherComponent;

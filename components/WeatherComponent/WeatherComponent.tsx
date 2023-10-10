import React, {useState} from 'react';
import moment from 'moment';
import {ActivityIndicator, Text, View} from 'react-native';
import {
  CELSIUS_UNIT,
  DATE_TIME_FORMAT,
  ERROR_FORECAST_TEXT,
  FAHRENHEIT_UNIT,
  FORECAST,
  MIDDLE_OF_DAY_FORMAT,
  M_S_METRIC,
  OPEN_WEATHER_MAP_APP_ID,
  OPEN_WEATHER_MAP_URL,
  PERCENT_METRIC,
  TIME_FORMAT,
  WEATHER,
  WEEK_DAY_FORMAT,
} from '../../utils/constants';
import {
  Forecast,
  Weather,
  WeatherComponentProps,
} from '../../types/WeatherTypes';
import WeatherItem from '../WeatherItem/WeatherItem';
import {weatherDetailsConstants} from '../../utils/weatherConstants';
import WeatherHeader from '../WeatherHeader/WeatherHeader';
import WeatherDescription from '../WeatherDescription/WeatherDescription';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import axios from 'axios';
import {useQuery} from 'react-query';
import WeatherWeekForecast from '../WeatherWeekForecast/WeatherWeekForecast';
import {formatTemperature} from '../../utils/utils';
import 'react-native-url-polyfill/auto';

import style from './style';

const WeatherComponent: React.FC<WeatherComponentProps> = ({
  location,
  refreshing,
  getWeatherConditionId,
}) => {
  const [unit, setUnit] = useState(CELSIUS_UNIT);
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState<
    Record<string, string>
  >({wind: '', humidity: '', sunrise: '', sunset: '', cloudiness: ''});

  const getWeather = async (url: string, metric: string) => {
    const openWeatherMapUrl = new URL(url);
    const locationParams = {
      lat: location.lat.toString(),
      lon: location.lon.toString(),
      units: metric,
      appid: OPEN_WEATHER_MAP_APP_ID,
    };
    openWeatherMapUrl.search = new URLSearchParams(locationParams).toString();

    const currentWeatherUrl = openWeatherMapUrl.toString();
    const response = await axios.get(currentWeatherUrl);

    return response.data;
  };

  const getCurrentWeather = async (metric: string) => {
    const weatherCondition = await getWeather(
      OPEN_WEATHER_MAP_URL + WEATHER,
      metric,
    );

    getWeatherConditionId(weatherCondition.weather[0].id);
    const weatherValues = prepareWeatherDetails(weatherCondition);
    setCurrentWeatherDetails(weatherValues);

    return weatherCondition;
  };

  const getWeekForecast = async (metric: string) => {
    const weekForecast = await getWeather(
      OPEN_WEATHER_MAP_URL + FORECAST,
      metric,
    );
    const weekForecastDetails: Forecast[] = [];

    const weekMiddleDayForecast = weekForecast.list.filter(
      (weekday: Record<string, number>) =>
        moment.unix(weekday.dt).format(TIME_FORMAT) === MIDDLE_OF_DAY_FORMAT,
    );

    weekMiddleDayForecast.forEach((weekday: Weather) => {
      const weatherValues = prepareWeekDayDetails(weekday);
      weekForecastDetails.push(weatherValues);
    });

    return weekForecastDetails;
  };

  const {
    isFetching: isLoading,
    isError: isErrorWeather,
    error: currentWeatherError,
    data: currentWeatherCondition,
    refetch: reFetchCurrentWeather,
  } = useQuery<Weather, Error>([WEATHER, unit], () => getCurrentWeather(unit));

  const {
    isFetching,
    isError,
    error: weekForecastError,
    data: weekForecast,
    refetch: reFetchWeekWeather,
  } = useQuery<Forecast[], Error>([FORECAST, unit], () =>
    getWeekForecast(unit),
  );

  const formatTime = (time: number | string) => {
    let formattedTime = time.toString();
    if (typeof time === 'number') {
      formattedTime = moment.unix(time).format(TIME_FORMAT);
    }

    return formattedTime;
  };

  const currentDate = currentWeatherCondition?.dt;

  const prepareWeatherDetails = (weather: Weather) => {
    const weatherValues = {
      wind: weather.wind.speed + M_S_METRIC,
      humidity: weather.main.humidity + PERCENT_METRIC,
      sunrise: formatTime(weather.sys.sunrise),
      sunset: formatTime(weather.sys.sunset),
      cloudiness: weather.clouds.all + PERCENT_METRIC,
    };

    return weatherValues;
  };

  const prepareWeekDayDetails = (dayForecast: Weather) => {
    const dayWeatherDetails = {
      date: moment.unix(dayForecast.dt).format(WEEK_DAY_FORMAT),
      icon: dayForecast.weather[0].icon,
      min_temp: formatTemperature(dayForecast.main.temp_max, unit),
      max_temp: formatTemperature(dayForecast.main.temp_max, unit),
      humidity: dayForecast.main.humidity + PERCENT_METRIC,
    };

    return dayWeatherDetails;
  };

  const handleChangeOfUnit = () => {
    const newUnit = unit === CELSIUS_UNIT ? FAHRENHEIT_UNIT : CELSIUS_UNIT;
    setUnit(newUnit);
  };

  return (
    <>
      {isFetching || isLoading || refreshing ? (
        <View style={style.infoContainer}>
          {isError || isErrorWeather ? (
            <ErrorComponent
              errorText={
                currentWeatherError
                  ? currentWeatherError.message
                  : weekForecastError
                  ? weekForecastError.message
                  : ERROR_FORECAST_TEXT
              }
              onRefreshPress={() => {
                reFetchCurrentWeather();
                reFetchWeekWeather();
              }}
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
          {currentWeatherCondition && (
            <>
              <WeatherHeader weather={currentWeatherCondition} unit={unit} />
              <WeatherDescription
                weather={currentWeatherCondition}
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
                      currentWeatherDetails[description.label.toLowerCase()]
                    }
                  />
                ))}
              </View>
            ))}
          </View>

          <>
            {weekForecast?.length && (
              <WeatherWeekForecast weekForecast={weekForecast} />
            )}
          </>
        </>
      )}
    </>
  );
};

export default WeatherComponent;

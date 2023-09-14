import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {ActivityIndicator, Alert, Text, View} from 'react-native';
import {
  CELSIUS_UNIT,
  DATE_TIME_FORMAT,
  ERROR_FORECAST_TEXT,
  ERROR_MESSAGE,
  FAHRENHEIT_UNIT,
  M_S_METRIC,
  OPEN_WEATHER_MAP_APP_ID,
  OPEN_WEATHER_MAP_URL,
  PERCENT_METRIC,
  TIME_FORMAT,
} from '../../utils/constants';
import {WeatherComponentProps, Weather} from '../../types/WeatherTypes';
import WeatherItem from '../WeatherItem/WeatherItem';
import {weatherDetailsConstants} from '../../utils/weatherConstants';
import WeatherHeader from '../WeatherHeader/WeatherHeader';
import WeatherDescription from '../WeatherDescription/WeatherDescription';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import 'react-native-url-polyfill/auto';

import style from './style';

const WeatherComponent: React.FC<WeatherComponentProps> = ({
  locationData,
  refreshing,
}) => {
  const weatherInitialState = {
    name: '',
    main: {},
    weather: [],
    coord: {},
    wind: {},
    clouds: {},
    sys: {},
    dt: 0,
  };

  const openWeatherMap = new URL(OPEN_WEATHER_MAP_URL);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState<Weather>(weatherInitialState);
  const [isLoading, setIsLoading] = useState(true);
  const [unit, setUnit] = useState(CELSIUS_UNIT);

  const [weatherDetails, setWeatherDetails] = useState(weatherDetailsConstants);
  const [weatherDetailsValues, setWeatherDetailsValues] = useState<
    Record<string, string>
  >({wind: '', humidity: '', sunrise: '', sunset: '', cloudiness: ''});

  useEffect(() => {
    getCurrentWeather(unit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, refreshing]);

  useEffect(() => {
    prepareWeatherDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData.wind]);

  const prepareWeatherDetails = () => {
    const weatherValues = {
      wind: weatherData.wind.speed + M_S_METRIC,
      humidity: weatherData.main.humidity + PERCENT_METRIC,
      sunrise: moment
        .unix(weatherData.sys.sunrise as number)
        .format(TIME_FORMAT),
      sunset: moment.unix(weatherData.sys.sunset as number).format(TIME_FORMAT),
      cloudiness: weatherData.clouds.all + PERCENT_METRIC,
    };

    setWeatherDetailsValues(weatherValues);
  };

  const handleChangeOfUnit = () => {
    const newUnit = unit === CELSIUS_UNIT ? FAHRENHEIT_UNIT : CELSIUS_UNIT;
    setUnit(newUnit);
    setIsLoading(true);
    getCurrentWeather(newUnit);
  };

  const getCurrentWeather = async (currentUnit: string) => {
    const locationParams = {
      lat: locationData.lat,
      lon: locationData.lon,
      units: currentUnit,
      appid: OPEN_WEATHER_MAP_APP_ID,
    };
    openWeatherMap.search = new URLSearchParams(locationParams).toString();

    const url = openWeatherMap.toString();

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        setIsLoading(false);
        setError(false);
      })
      .catch(err => {
        Alert.alert(ERROR_MESSAGE + err);
        setIsLoading(true);
        setError(true);
      });
  };

  return (
    <View>
      {isLoading || refreshing ? (
        <View style={style.infoContainer}>
          {error ? (
            <ErrorComponent
              errorText={ERROR_FORECAST_TEXT}
              onPress={() => getCurrentWeather(unit)}
            />
          ) : (
            <View style={style.indicatorContainer}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      ) : (
        <View>
          <View>
            <Text style={style.dateAndTime}>
              {moment.unix(weatherData.dt).format(DATE_TIME_FORMAT)}
            </Text>
          </View>
          <WeatherHeader weatherData={weatherData} unit={unit} />
          <WeatherDescription
            weatherData={weatherData}
            unit={unit}
            handlePress={handleChangeOfUnit}
          />

          <View style={style.weatherDescriptionDetails}>
            {weatherDetails.map((detail, index) => (
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
        </View>
      )}
    </View>
  );
};

export default WeatherComponent;

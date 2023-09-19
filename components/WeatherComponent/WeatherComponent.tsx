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
  locationData,
  refreshing,
  getWeatherConditionId,
}) => {
  const openWeatherMap = new URL(OPEN_WEATHER_MAP_URL);
  const [unit, setUnit] = useState(CELSIUS_UNIT);
  const [weatherDetails, setWeatherDetails] = useState(weatherDetailsConstants);
  const [weatherDetailsValues, setWeatherDetailsValues] = useState<
    Record<string, string>
  >({wind: '', humidity: '', sunrise: '', sunset: '', cloudiness: ''});

  const getCurrentWeather = async () => {
    const locationParams = {
      lat: locationData.lat,
      lon: locationData.lon,
      units: unit,
      appid: OPEN_WEATHER_MAP_APP_ID,
    };
    openWeatherMap.search = new URLSearchParams(locationParams).toString();

    const url = openWeatherMap.toString();
    const {data} = await axios.get(url);
    getWeatherConditionId(data.weather[0].id);
    prepareWeatherDetails(data);

    return data;
  };

  const {isFetching, isError, data, refetch} = useQuery({
    queryKey: 'weather',
    queryFn: getCurrentWeather,
  });

  useEffect(() => {
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, refreshing]);

  const prepareWeatherDetails = (weatherData: Weather) => {
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
  };

  return (
    <View>
      {isFetching || refreshing ? (
        <View style={style.infoContainer}>
          {isError ? (
            <ErrorComponent
              errorText={ERROR_FORECAST_TEXT}
              onPress={() => refetch() as unknown as Promise<void>}
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
              {moment.unix(data.dt).format(DATE_TIME_FORMAT)}
            </Text>
          </View>
          <WeatherHeader weatherData={data} unit={unit} />
          <WeatherDescription
            weatherData={data}
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

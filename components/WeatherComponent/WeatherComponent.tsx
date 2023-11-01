import React, {useState} from 'react';
import moment from 'moment';
import {ActivityIndicator, NativeModules, Text, View} from 'react-native';
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
  TAB_ROUTE_CURRENT_FORECAST_KEY,
  TAB_ROUTE_CURRENT_FORECAST_TITLE,
  TAB_ROUTE_WEEK_FORECAST_KEY,
  TAB_ROUTE_WEEK_FORECAST_TITLE,
  TIME_FORMAT,
  WEATHER,
  WEEK_DAY_FORMAT,
} from '../../utils/constants';
import {
  Forecast,
  Weather,
  WeatherComponentProps,
} from '../../types/WeatherTypes';

import WeatherHeader from '../WeatherHeader/WeatherHeader';
import WeatherDescription from '../WeatherDescription/WeatherDescription';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import axios from 'axios';
import {useQuery} from 'react-query';
import {formatTemperature} from '../../utils/utils';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {
  FirstRoute,
  RouteWrapper,
  SecondRoute,
  initialLayout,
} from '../WeatherTabRoutes/WeatherTabRoutes';
import 'react-native-url-polyfill/auto';
import SharedGroupPreferences from 'react-native-shared-group-preferences';
import {triggerPushNotification} from '../../utils/pushNotifications';

import style from './style';

const group = 'group.streak';
const SharedStorage = NativeModules.SharedStorage;

const WeatherComponent: React.FC<WeatherComponentProps> = ({
  location,
  refreshing,
  getWeatherConditionId,
  // handleRefresh,
}) => {
  const [unit, setUnit] = useState(CELSIUS_UNIT);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState<Array<Record<K, T>>>([
    {
      key: TAB_ROUTE_CURRENT_FORECAST_KEY,
      title: TAB_ROUTE_CURRENT_FORECAST_TITLE,
    },
    {key: TAB_ROUTE_WEEK_FORECAST_KEY, title: TAB_ROUTE_WEEK_FORECAST_TITLE},
  ]);

  const widgetData = {
    city: '',
    temperature: '',
  };

  const updateWidgetData = async (
    currentTemp: number,
    currentLocation: string,
  ) => {
    try {
      // iOS
      await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
    } catch (error) {
      console.log({error});
    }

    const value = {
      city: currentLocation,
      temperature: formatTemperature(currentTemp, unit),
    };

    // Android
    SharedStorage.set(JSON.stringify(value));
  };

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
    await updateWidgetData(weatherCondition.main.temp, weatherCondition.name);

    getWeatherConditionId(weatherCondition.weather[0].id);
    const weatherValues = prepareWeatherDetails(weatherCondition);

    await triggerPushNotification(
      weatherCondition.main.temp,
      weatherCondition.weather[0].main,
      metric,
    );

    const firstRoute = routes.find(
      route => route.key === TAB_ROUTE_CURRENT_FORECAST_KEY,
    );
    if (firstRoute) {
      firstRoute.content = weatherValues;
      setRoutes([...routes]);
    }

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

    const secondRoute = routes.find(
      route => route.key === TAB_ROUTE_WEEK_FORECAST_KEY,
    );
    if (secondRoute) {
      secondRoute.content = weekForecastDetails;

      setRoutes([...routes]);
    }

    return weekForecastDetails;
  };

  const {
    isFetching: isLoading,
    isError: isErrorWeather,
    isSuccess: isCurrentWeatherDone,
    error: currentWeatherError,
    data: currentWeatherCondition,
    refetch: reFetchCurrentWeather,
  } = useQuery<Weather, Error>([WEATHER, unit], () => getCurrentWeather(unit));

  const {
    isFetching,
    isError,
    isSuccess: isWeekForecastDone,
    error: weekForecastError,
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

  const renderScene = SceneMap({
    first: RouteWrapper(FirstRoute),
    second: RouteWrapper(SecondRoute),
  });

  const renderTabBar = (props: T) => (
    <TabBar
      {...props}
      indicatorStyle={style.tabIndicator}
      style={style.tabBar}
    />
  );

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
          <View style={style.container}>
            <Text style={style.dateAndTime}>
              {currentDate && moment.unix(currentDate).format(DATE_TIME_FORMAT)}
            </Text>
          </View>
          {currentWeatherCondition && (
            <View style={style.stickyHeader}>
              <WeatherHeader weather={currentWeatherCondition} unit={unit} />
              <WeatherDescription
                weather={currentWeatherCondition}
                unit={unit}
                onChangeUnit={handleChangeOfUnit}
              />
            </View>
          )}

          {isCurrentWeatherDone && isWeekForecastDone && (
            <View style={style.tabContainer}>
              <TabView
                renderTabBar={renderTabBar}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default WeatherComponent;

import React from 'react';
import {ScrollView, View} from 'react-native';
import {weatherDetailsConstants} from '../../utils/weatherConstants';
import WeatherItem from '../WeatherItem/WeatherItem';
import WeatherWeekForecast from '../WeatherWeekForecast/WeatherWeekForecast';

import style from './style';
import WeatherChartForecast from '../WeatherChartForecast/WeatherChartForecast';

export const RouteWrapper = (
  WrappedComponent: React.FC<{route: {content: T}}>,
) => {
  return (props: T) => {
    return (
      <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        // }
        showsVerticalScrollIndicator={false}>
        <WrappedComponent {...props} />
      </ScrollView>
    );
  };
};

export const FirstRoute = ({route}: {route: {content: T}}) => (
  <View style={style.weatherDescriptionDetails}>
    {weatherDetailsConstants.map((detail, index) => (
      <View key={index} style={style.weatherDescription}>
        {detail.map((description, detailIndex) => (
          <WeatherItem
            key={detailIndex + 'detail'}
            icon={description.icon}
            label={description.label}
            value={route.content[description.label.toLowerCase()]}
          />
        ))}
      </View>
    ))}
  </View>
);

export const SecondRoute = ({route}: {route: {content: T}}) => (
  <View>
    {route.content?.length && (
      <WeatherChartForecast weekForecast={route.content} />
    )}
  </View>
);

export const ThirdRoute = ({route}: {route: {content: T}}) => (
  <View>
    {route.content?.length && (
      <WeatherWeekForecast weekForecast={route.content} />
    )}
  </View>
);

export const initialLayout = {width: 100};

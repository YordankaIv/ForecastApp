import React from 'react';
import {ScrollView, View} from 'react-native';
import WeatherWeekForecast from '../WeatherWeekForecast/WeatherWeekForecast';
import WeatherChartForecast from '../WeatherChartForecast/WeatherChartForecast';
import WeatherDetails from '../WeatherDetails/WeatherDetails';

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
  <View>
    {route.content && <WeatherDetails weatherDetails={route.content} />}
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

import React, {useEffect, useRef, useState} from 'react';
import {AppState, ImageBackground, SafeAreaView} from 'react-native';
import {
  BACKGROUNT_IMAGE_FOG_URI,
  BACKGROUNT_IMAGE_RAIN_URI,
  BACKGROUNT_IMAGE_SNOW_URI,
  BACKGROUNT_IMAGE_STORM_URI,
  BACKGROUNT_IMAGE_URI,
  ERROR_LOCATION_TEXT,
} from '../../utils/constants';
import {useQuery} from 'react-query';
import WeatherComponent from '../../components/WeatherComponent/WeatherComponent';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {
  checkLocationPermission,
  requestLocationPermission,
} from '../../utils/utils';
import {useRefresh} from '../../hooks/common/useRefresh';
import {WeatherConditionIds} from '../../utils/weatherConstants';

import style from './style';

const Home: React.FC = () => {
  const [backgroundImageURI, setBackgroundImageURI] =
    useState(BACKGROUNT_IMAGE_URI);

  const appState = useRef(AppState.currentState);

  const getPosition = () =>
    new Promise<GeolocationResponse>((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject);
    });

  const getLocation = async () => {
    const result = await checkLocationPermission();
    if (!result) {
      await requestLocationPermission();
    }

    const geolocation = await getPosition();
    return geolocation;
  };

  const {
    isSuccess,
    isError,
    data: location,
    refetch,
    error,
  } = useQuery<GeolocationResponse, Error>({
    queryKey: 'location',
    queryFn: getLocation,
  });

  const {refreshing, handleRefresh} = useRefresh(refetch);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      //minimized and re-opened
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // check Permission and get location again
        refetch();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [refetch]);

  const getWeatherConditionId = (id: number) => {
    switch (id.toString()[0]) {
      case WeatherConditionIds.SUNNY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUNT_IMAGE_URI);
        break;
      case WeatherConditionIds.FOGGY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUNT_IMAGE_FOG_URI);
        break;
      case WeatherConditionIds.SNOWY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUNT_IMAGE_SNOW_URI);
        break;
      case WeatherConditionIds.HEAVY_RAINY_WEATHER_CONDITION_ID:
      case WeatherConditionIds.LIGHT_RAINY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUNT_IMAGE_RAIN_URI);
        break;
      case WeatherConditionIds.STORM_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUNT_IMAGE_STORM_URI);
        break;
      default:
        setBackgroundImageURI(BACKGROUNT_IMAGE_URI);
    }
  };

  return (
    <SafeAreaView style={style.flex}>
      <ImageBackground
        source={{
          uri: backgroundImageURI,
        }}
        resizeMode={'cover'}
        style={style.image}>
        {isError && (
          <ErrorComponent
            errorText={error ? error.message : ERROR_LOCATION_TEXT}
          />
        )}
        {isSuccess && (
          <WeatherComponent
            handleRefresh={handleRefresh}
            getWeatherConditionId={getWeatherConditionId}
            location={{
              lat: location.coords.latitude,
              lon: location.coords.longitude,
            }}
            refreshing={refreshing}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

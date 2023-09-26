import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
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

    const data = await getPosition();
    return data;
  };

  const {isSuccess, isError, data, refetch, error} = useQuery({
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
      case '8':
        setBackgroundImageURI(BACKGROUNT_IMAGE_URI);
        break;
      case '7':
        setBackgroundImageURI(BACKGROUNT_IMAGE_FOG_URI);
        break;
      case '6':
        setBackgroundImageURI(BACKGROUNT_IMAGE_SNOW_URI);
        break;
      case '5':
      case '3':
        setBackgroundImageURI(BACKGROUNT_IMAGE_RAIN_URI);
        break;
      case '2':
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}>
          {isError && (
            <ErrorComponent
              errorText={error ? (error as Error).message : ERROR_LOCATION_TEXT}
            />
          )}
          {isSuccess && (
            <WeatherComponent
              getWeatherConditionId={getWeatherConditionId}
              locationData={{
                lat: (data as GeolocationResponse).coords.latitude,
                lon: (data as GeolocationResponse).coords.longitude,
              }}
              refreshing={refreshing}
            />
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

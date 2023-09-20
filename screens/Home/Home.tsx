import React, {useCallback, useState} from 'react';
import {
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
import {requestLocationPermission} from '../../utils/utils';

import style from './style';

export function useUserRefresh<T>(refetch: () => Promise<T>) {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);
  return {refreshing, handleRefresh};
}

const Home: React.FC = () => {
  const [backgroundImageURI, setBackgroundImageURI] =
    useState(BACKGROUNT_IMAGE_URI);

  const getPosition = () =>
    new Promise<GeolocationResponse>((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject);
    });

  const getLocation = async () => {
    await requestLocationPermission();
    const data = await getPosition();
    return data;
  };

  const {isSuccess, isError, data, refetch, error} = useQuery({
    queryKey: 'location',
    queryFn: getLocation,
  });

  const {refreshing, handleRefresh} = useUserRefresh(refetch);

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

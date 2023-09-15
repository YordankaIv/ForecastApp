import React, {useCallback, useState} from 'react';
import axios from 'axios';
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
  IP_GEOLOCATION_URL,
} from '../../utils/constants';
import {useQuery} from 'react-query';
import WeatherComponent from '../../components/WeatherComponent/WeatherComponent';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

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

  const getLocation = async () => {
    const {data} = await axios.get(IP_GEOLOCATION_URL);
    return data;
  };

  const {isSuccess, isError, data, refetch} = useQuery({
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
          {isError && <ErrorComponent errorText={ERROR_LOCATION_TEXT} />}
          {isSuccess && (
            <WeatherComponent
              getWeatherConditionId={getWeatherConditionId}
              locationData={{lat: data.lat, lon: data.lon}}
              refreshing={refreshing}
            />
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {
  BACKGROUNT_IMAGE_URI,
  ERROR_LOCATION_TEXT,
  ERROR_MESSAGE,
  IP_GEOLOCATION_URL,
} from '../../utils/constants';
import WeatherComponent from '../../components/WeatherComponent/WeatherComponent';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';

import style from './style';

const Home: React.FC = () => {
  const locationInitialState = {lat: '', lon: ''};
  const [locationData, setLocationData] = useState(locationInitialState);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    await fetch(IP_GEOLOCATION_URL)
      .then(response => response.json())
      .then(data => {
        const {lat, lon} = data;
        setLocationData({lat, lon});
        setError(false);
      })
      .catch(err => {
        setLocationData(locationInitialState);
        Alert.alert(ERROR_MESSAGE + err);
        setError(true);
      })
      .finally(() => setRefreshing(false));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getCurrentLocation();
  };

  return (
    <SafeAreaView style={style.flex}>
      <ImageBackground
        source={{
          uri: BACKGROUNT_IMAGE_URI,
        }}
        resizeMode={'cover'}
        style={style.image}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}>
          {locationData.lat && (
            <WeatherComponent
              locationData={locationData}
              refreshing={refreshing}
            />
          )}
          {error ? <ErrorComponent errorText={ERROR_LOCATION_TEXT} /> : null}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

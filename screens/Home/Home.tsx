import React, {useEffect, useRef, useState} from 'react';
import {AppState, ImageBackground, SafeAreaView} from 'react-native';
import {
  BACKGROUND_IMAGE_FOG_URI,
  BACKGROUND_IMAGE_RAIN_URI,
  BACKGROUND_IMAGE_SNOW_URI,
  BACKGROUND_IMAGE_STORM_URI,
  BACKGROUND_IMAGE_URI,
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
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';

import globalStyle from '../../assets/styles/globalStyle';

const Home: React.FC = () => {
  const [backgroundImageURI, setBackgroundImageURI] =
    useState(BACKGROUND_IMAGE_URI);
  const [location, setLocation] = useState<{lat: number; lon: number}>();
  const [loading, setLoading] = useState(true);
  const route: RouteProp<{params: {location: {lat: number; lon: number}}}> =
    useRoute();

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
    isError,
    refetch,
    data: currentLocation,
    error,
  } = useQuery<GeolocationResponse, Error>({
    queryKey: 'currentLocation',
    queryFn: getLocation,
  });

  useEffect(() => {
    if (!route.params && currentLocation) {
      setLocation({
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      });
    }
  }, [currentLocation]);

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

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      if (route.params) {
        setLocation(route.params.location);
      }
      setTimeout(() => setLoading(false), 2000);
    }, [route.params]),
  );

  const getWeatherConditionId = (id: number) => {
    switch (id.toString()[0]) {
      case WeatherConditionIds.SUNNY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUND_IMAGE_URI);
        break;
      case WeatherConditionIds.FOGGY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUND_IMAGE_FOG_URI);
        break;
      case WeatherConditionIds.SNOWY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUND_IMAGE_SNOW_URI);
        break;
      case WeatherConditionIds.HEAVY_RAINY_WEATHER_CONDITION_ID:
      case WeatherConditionIds.LIGHT_RAINY_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUND_IMAGE_RAIN_URI);
        break;
      case WeatherConditionIds.STORM_WEATHER_CONDITION_ID:
        setBackgroundImageURI(BACKGROUND_IMAGE_STORM_URI);
        break;
      default:
        setBackgroundImageURI(BACKGROUND_IMAGE_URI);
    }
  };

  return (
    <SafeAreaView style={globalStyle.flex}>
      <ImageBackground
        source={{
          uri: backgroundImageURI,
        }}
        resizeMode={'cover'}
        style={globalStyle.image}>
        {isError && (
          <ErrorComponent
            errorText={error ? error.message : ERROR_LOCATION_TEXT}
          />
        )}
        {!loading && location && (
          <WeatherComponent
            handleRefresh={handleRefresh}
            getWeatherConditionId={getWeatherConditionId}
            location={location}
            refreshing={refreshing}
          />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

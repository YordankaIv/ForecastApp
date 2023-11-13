import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Pressable,
} from 'react-native';
import {
  BACKGROUND_IMAGE_LOGIN_URI,
  DIRECT,
  LOCATION_FIELD_PLACEHOLDER,
  MENU_LOCATIONS_OPTION,
  OPEN_WEATHER_MAP_APP_ID,
  OPEN_WEATHER_MAP_GEO_URL,
  USERS_PATH,
} from '../../utils/constants';
import {firebase} from '@react-native-firebase/auth';
import axios from 'axios';
import {Autocomplete} from '../../components/Autocomplete/Autocomplete';
import {Routes} from '../../navigation/Routes';
import {AutocompleteOption, Nav} from '../../types/CommonTypes';
import {getData, saveData} from '../../utils/firebaseUtils';
import {useNavigation} from '@react-navigation/native';

import style from './style';

const Locations: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const user = firebase.auth().currentUser;
  const uid = user ? user.uid : '';
  const [locations, setLocations] = useState<
    | Array<{name: string; country: string; coords: {lat: number; lon: number}}>
    | []
  >([]);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    const data = await getData(USERS_PATH, uid);
    setLocations(data.val());
  };

  const onSelectLocation = (item: AutocompleteOption) => {
    const option = typeof item.title === 'string' ? item.title.split(', ') : '';
    const prevLocations = locations || [];
    const newLocations = [
      ...prevLocations,
      {name: option[0], country: option[1], coords: item.coords},
    ];

    saveData(USERS_PATH, uid, newLocations);

    navigation.navigate(Routes.Home, {
      location: item.coords,
    });
  };

  const findLocation = async (value: string) => {
    const openWeatherMapUrl = new URL(OPEN_WEATHER_MAP_GEO_URL + DIRECT);
    const locationParams = {
      q: value,
      appid: OPEN_WEATHER_MAP_APP_ID,
    };
    openWeatherMapUrl.search = new URLSearchParams(locationParams).toString();

    const currentWeatherUrl = openWeatherMapUrl.toString();

    const filterToken = value.toLowerCase();
    const response = await axios.get(currentWeatherUrl);
    const items = await response.data;
    const suggestions = items
      .filter((item: {name: string}) =>
        item.name.toLowerCase().includes(filterToken),
      )
      .map(item => ({
        title: `${item.name}, ${item.country}`,
        coords: {lat: item.lat, lon: item.lon},
      }));

    return suggestions;
  };

  return (
    <SafeAreaView style={style.flex}>
      <ImageBackground
        source={{
          uri: BACKGROUND_IMAGE_LOGIN_URI,
        }}
        resizeMode={'cover'}
        style={style.image}>
        <View style={style.autocompleteContainer}>
          <Autocomplete
            placeholder={LOCATION_FIELD_PLACEHOLDER}
            findSuggestions={findLocation}
            onSelectOption={item => {
              onSelectLocation(item);
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}>
          <View>
            <Text style={style.locationsTitle}>{MENU_LOCATIONS_OPTION}</Text>
            {locations &&
              locations.map((savedLocation, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate(Routes.Home, {
                      location: savedLocation.coords,
                    })
                  }
                  style={style.locationContainer}>
                  <Text style={style.location}>
                    {savedLocation.name}, {savedLocation.country}
                  </Text>
                </Pressable>
              ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Locations;

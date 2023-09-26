import {Alert, Linking, PermissionsAndroid} from 'react-native';
import {
  ALERT_DIALOG_BUTTON_SETTINGS,
  ALERT_DIALOG_MESSAGE,
  ALERT_DIALOG_TITLE,
  CELSIUS_LETTER,
  FAHRENHEIT_LETTER,
  FAHRENHEIT_UNIT,
  REQUEST_LOCATION_DIALOG_BUTTON_NEGATIVE,
  REQUEST_LOCATION_DIALOG_BUTTON_NEUTRAL,
  REQUEST_LOCATION_DIALOG_BUTTON_POSITIVE,
  REQUEST_LOCATION_DIALOG_MESSAGE,
  REQUEST_LOCATION_DIALOG_TITLE,
} from './constants';

export const formatTemperature = (temp: number, unit: string) => {
  const formatedTemp = Math.ceil(temp);
  let unitLetter = CELSIUS_LETTER;
  if (unit === FAHRENHEIT_UNIT) {
    unitLetter = FAHRENHEIT_LETTER;
  }

  return formatedTemp + unitLetter;
};

const openSettings = () => {
  Linking.openSettings();
};

export const checkLocationPermission = async () => {
  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return result;
};

export const requestLocationPermission = async () => {
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: REQUEST_LOCATION_DIALOG_TITLE,
        message: REQUEST_LOCATION_DIALOG_MESSAGE,
        buttonNeutral: REQUEST_LOCATION_DIALOG_BUTTON_NEUTRAL,
        buttonNegative: REQUEST_LOCATION_DIALOG_BUTTON_NEGATIVE,
        buttonPositive: REQUEST_LOCATION_DIALOG_BUTTON_POSITIVE,
      },
    );

    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else if (result === PermissionsAndroid.RESULTS.DENIED) {
      requestLocationPermission();
      return false;
    } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(ALERT_DIALOG_TITLE, ALERT_DIALOG_MESSAGE, [
        {text: REQUEST_LOCATION_DIALOG_BUTTON_NEGATIVE, style: 'cancel'},
        {text: ALERT_DIALOG_BUTTON_SETTINGS, onPress: openSettings},
      ]);
    }
  } catch (err) {
    return false;
  }
};

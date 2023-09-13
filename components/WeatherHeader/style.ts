import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTemperature: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(50),
    fontWeight: '600',
    color: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    height: horizontalScale(100),
    width: horizontalScale(100),
  },
  currentWeather: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(20),
    fontWeight: '400',
    color: '#ffffff',
  },
});

export default style;

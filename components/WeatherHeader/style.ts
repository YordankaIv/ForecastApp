import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsContants';

const style = StyleSheet.create({
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTemperature: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(50),
    fontWeight: '600',
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
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
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTemperature: {
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
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
  },
});

export default style;

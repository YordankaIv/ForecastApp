import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsContants';

const style = StyleSheet.create({
  weekWeatherContainer: {
    marginVertical: verticalScale(50),
  },
  dayContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    color: Colors.white,
    height: verticalScale(60),
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 127, 255, 0.2)',
    borderRadius: horizontalScale(20),
    marginBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  maxContainerSize: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
  },
  weekDetailContainer: {},
  sortToolsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  sortInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    gap: 10,
  },
  weatherDetails: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(14),
    fontWeight: '400',
    color: Colors.white,
  },
  icon: {
    height: horizontalScale(30),
    width: horizontalScale(30),
  },
  smallDataSize: {
    width: '16%',
    maxWidth: '16%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default style;

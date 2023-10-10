import {StyleSheet} from 'react-native';
import {scaleFontSize, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsContants';

const style = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'column',
    marginTop: verticalScale(25),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(17),
    marginRight: verticalScale(5),
    fontWeight: '700',
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
  },
  tempDetailsContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  tempDetails: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(14),
    fontWeight: '700',
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    marginRight: verticalScale(10),
  },
  changeUnitContainer: {
    marginTop: verticalScale(20),
    zIndex: 1,
  },
  changeUnit: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    fontWeight: '700',
    color: Colors.lightBlue,
    textShadowColor: Colors.black,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
  },
  errorContainer: {
    marginVertical: verticalScale(30),
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

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
    marginRight: verticalScale(5),
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
    color: Colors.lightBlue,
    textShadowColor: Colors.black,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
  },
});

export default style;

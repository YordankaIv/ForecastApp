import {StyleSheet} from 'react-native';
import {scaleFontSize, verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: verticalScale(25),
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(15),
    marginRight: verticalScale(5),
    fontWeight: '400',
    color: '#ffffff',
  },
  tempDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(5),
  },
  tempDetails: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(12),
    fontWeight: '400',
    color: '#ffffff',
    marginRight: verticalScale(10),
  },
  changeUnitContainer: {
    marginTop: verticalScale(20),
    zIndex: 1,
  },
  changeUnit: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(12),
    fontWeight: '400',
    color: '#2979F2',
  },
  errorContainer: {
    marginVertical: verticalScale(30),
  },
});

export default style;

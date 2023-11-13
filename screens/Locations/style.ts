import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  container: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    flexDirection: 'column',
  },
  autocompleteContainer: {
    height: verticalScale(200),
    marginHorizontal: horizontalScale(24),
  },
  locationContainer: {
    backgroundColor: Colors.darkBlue,
    borderRadius: horizontalScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    marginVertical: verticalScale(5),
  },
  locationsTitle: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(18),
    fontWeight: '700',
    color: Colors.darkWhite,
  },
  location: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(15),
    fontWeight: '600',
    color: Colors.darkWhite,
  },
});

export default style;

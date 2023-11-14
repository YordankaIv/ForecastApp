import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
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
  darkWhiteColor: {
    color: Colors.darkWhite,
  },
});

export default style;

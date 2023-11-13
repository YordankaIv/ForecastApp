import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  header: {
    marginTop: verticalScale(40),
    paddingTop: verticalScale(10),
    marginHorizontal: horizontalScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerIntroText: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    fontWeight: '600',
    color: Colors.white,
  },
  userName: {
    marginTop: verticalScale(5),
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
});

export default style;

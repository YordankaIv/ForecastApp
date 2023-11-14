import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tabContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(24),
  },
  currentDateContainer: {
    marginHorizontal: horizontalScale(24),
    marginTop: verticalScale(60),
    height: verticalScale(70),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  stickyHeader: {
    marginHorizontal: horizontalScale(24),
  },
  indicatorContainer: {
    flex: 1,
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateAndTime: {
    color: Colors.white,
    textShadowColor: Colors.white,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    marginBottom: verticalScale(50),
  },
  tabIndicator: {
    backgroundColor: Colors.white,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  button: {
    backgroundColor: Colors.lightBlue,
    height: horizontalScale(40),
    width: horizontalScale(150),
    justifyContent: 'center',
    marginTop: verticalScale(15),
    borderRadius: horizontalScale(50),
  },
  title: {
    lineHeight: 19,
    color: Colors.lightBlue,
    textShadowColor: Colors.lightBlue,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    color: Colors.red,
    marginTop: verticalScale(15),
  },
  errorContainer: {
    flex: 1,
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;

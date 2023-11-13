import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  button: {
    backgroundColor: Colors.azureBlue,
    height: verticalScale(55),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    lineHeight: scaleFontSize(19),
    color: Colors.white,
    textAlign: 'center',
  },
});

export default style;

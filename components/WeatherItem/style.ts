import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsContants';

const style = StyleSheet.create({
  descriptionContainer: {
    width: '48%',
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 127, 255, 0.2)',
    borderRadius: horizontalScale(20),
  },
  descriptionLabel: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: Colors.white,
  },
  descriptionValue: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(14),
    fontWeight: '400',
    color: Colors.white,
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  descriptionContainer: {
    width: '48%',
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 127, 255, 0.4)',
    borderRadius: horizontalScale(20),
  },
  descriptionLabel: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: '#ffffff',
  },
  descriptionValue: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(14),
    fontWeight: '400',
    color: '#ffffff',
  },
});

export default style;

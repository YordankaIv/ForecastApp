import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  button: {
    backgroundColor: '#2979F2',
    height: horizontalScale(40),
    width: horizontalScale(150),
    justifyContent: 'center',
    marginTop: verticalScale(15),
    borderRadius: horizontalScale(50),
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    lineHeight: 19,
    color: '#ffffff',
    textAlign: 'center',
  },
  error: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(30),
    fontWeight: '600',
    textAlign: 'center',
    color: '#FF0000',
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

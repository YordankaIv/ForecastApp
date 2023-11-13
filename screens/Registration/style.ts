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
    justifyContent: 'center',
  },
  registrationButton: {
    alignItems: 'center',
  },
  success: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    color: Colors.azureBlue,
    marginBottom: verticalScale(24),
  },
  error: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    color: Colors.red,
    marginBottom: verticalScale(24),
  },
  registerForm: {
    backgroundColor: Colors.darkBlue,
    padding: 20,
    borderRadius: horizontalScale(25),
    marginBottom: verticalScale(20),
  },
});

export default style;

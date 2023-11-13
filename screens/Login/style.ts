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
  loginButton: {
    marginVertical: verticalScale(20),
  },
  registrationButton: {
    alignItems: 'center',
  },
  registrationLabel: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    color: Colors.azureBlue,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  error: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    color: Colors.lightBlue,
    marginBottom: verticalScale(24),
  },
  loginForm: {
    backgroundColor: Colors.darkBlue,
    padding: 20,
    borderRadius: horizontalScale(25),
  },
});

export default style;

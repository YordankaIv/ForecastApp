import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
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
    color: Colors.azureBlue,
    textDecorationLine: 'underline',
  },
  loginForm: {
    backgroundColor: Colors.darkBlue,
    padding: 20,
    borderRadius: horizontalScale(25),
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    justifyContent: 'center',
  },
  registerForm: {
    backgroundColor: Colors.darkBlue,
    padding: 20,
    borderRadius: horizontalScale(25),
    marginBottom: verticalScale(20),
  },
});

export default style;

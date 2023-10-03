import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

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
    marginTop: verticalScale(40),
  },
});

export default style;

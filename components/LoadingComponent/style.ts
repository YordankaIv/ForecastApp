import {StyleSheet} from 'react-native';
import {verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  descriptionContainer: {
    width: '48%',
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 127, 255, 0.2)',
    borderRadius: horizontalScale(20),
  },
  whiteColor: {
    color: Colors.white,
  },
});

export default style;

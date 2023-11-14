import {StyleSheet} from 'react-native';
import {verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  label: {
    color: Colors.black,
  },
  input: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    marginBottom: verticalScale(15),
  },
});

export default style;

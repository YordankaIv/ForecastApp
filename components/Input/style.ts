import {StyleSheet} from 'react-native';
import {scaleFontSize, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  label: {
    fontFamily: 'Raleway',
    fontWeight: '400',
    color: Colors.black,
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
  },
  input: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    marginBottom: verticalScale(15),
  },
});

export default style;

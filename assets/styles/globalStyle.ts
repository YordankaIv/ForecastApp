import {StyleSheet} from 'react-native';
import {scaleFontSize, verticalScale} from './scaling';
import {Colors} from '../../utils/colorsConstants';

const globalStyle = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  error: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    color: Colors.red,
    marginBottom: verticalScale(24),
  },
  success: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    color: Colors.azureBlue,
    marginBottom: verticalScale(24),
  },
  normalWeight: {
    fontWeight: '400',
  },
  mediumWeight: {
    fontWeight: '500',
  },
  boldWeight: {
    fontWeight: '600',
  },
  bolderWeight: {
    fontWeight: '700',
  },
  XXLSize: {
    fontSize: scaleFontSize(50),
  },
  XLSize: {
    fontSize: scaleFontSize(25),
  },
  LSize: {
    fontSize: scaleFontSize(18),
  },
  MSize: {
    fontSize: scaleFontSize(16),
  },
  SSize: {
    fontSize: scaleFontSize(14),
  },
  RalewayFont: {
    fontFamily: 'Raleway',
  },
});

export default globalStyle;

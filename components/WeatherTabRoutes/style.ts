import {StyleSheet} from 'react-native';
import {verticalScale} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  weatherDescriptionDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  weatherDescription: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(24),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: Colors.black,
  },
  description: {
    color: Colors.black,
    marginTop: verticalScale(10),
    textAlign: 'center',
  },
  textContainer: {
    marginVertical: verticalScale(20),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(12),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
  },
  title: {
    color: Colors.lightBlue,
    textAlign: 'center',
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  flex: {
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
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(25),
    fontWeight: '600',
    color: '#000000',
  },
  description: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(15),
    fontWeight: '400',
    color: '#000000',
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
    borderColor: '#2979F2',
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(12),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(20),
    fontWeight: '500',
    color: '#2979F2',
    textAlign: 'center',
  },
});

export default style;

import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';

const style = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  indicatorContainer: {
    flex: 1,
    height: verticalScale(300),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateAndTime: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(20),
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: '#131212',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  errorContainer: {
    marginVertical: verticalScale(30),
  },
  button: {
    backgroundColor: '#2979F2',
    height: horizontalScale(55),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
  },
  title: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    lineHeight: 19,
    color: '#ffffff',
    textShadowColor: '#131212',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
    textAlign: 'center',
  },
  weatherDescriptionDetails: {
    flex: 1,
    flexDirection: 'column',
    marginTop: verticalScale(30),
  },
  weatherDescription: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  descriptionContainer: {
    width: '48%',
    height: verticalScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
    borderRadius: horizontalScale(20),
    backgroundColor: '#007FFF',
  },
  descriptionLabel: {
    fontFamily: 'Raleway',
    fontSize: scaleFontSize(16),
    fontWeight: '600',
    color: '#ffffff',
    textShadowColor: '#131212',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 2,
  },
});

export default style;

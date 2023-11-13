import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {Colors} from '../../utils/colorsConstants';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButtonsContainer: {
    right: horizontalScale(8),
    height: verticalScale(30),
    alignSelf: 'center',
  },
  textInput: {
    borderRadius: horizontalScale(25),
    backgroundColor: Colors.white,
    color: Colors.black,
    paddingLeft: horizontalScale(18),
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: horizontalScale(25),
  },
  suggestionsContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  suggestion: {
    color: Colors.black,
    padding: 15,
  },
  autocompleteContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default style;

import React, {memo, useCallback, useRef, useState} from 'react';
import {Dimensions, Text, View, Platform} from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownContextProvider,
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';
import {AutocompleteProps} from '../../types/CommonTypes';

import style from './style';

export const Autocomplete: React.FC<AutocompleteProps> = memo(
  ({placeholder, findSuggestions, onSelectOption}) => {
    const [loading, setLoading] = useState(false);
    const [suggestionsList, setSuggestionsList] = useState<
      null | TAutocompleteDropdownItem[]
    >(null);
    const dropdownController = useRef(null);

    const searchRef = useRef(null);

    const getSuggestions = useCallback(async (q: string) => {
      setLoading(true);
      if (q.length < 3) {
        setSuggestionsList(null);
        return;
      }

      const suggestions = await findSuggestions(q);
      setSuggestionsList(suggestions);
      setLoading(false);
    }, []);

    const onClearPress = useCallback(() => {
      setSuggestionsList(null);
    }, []);

    return (
      <AutocompleteDropdownContextProvider>
        <View style={[style.container, Platform.select({ios: {zIndex: 1}})]}>
          <AutocompleteDropdown
            ref={searchRef}
            controller={controller => {
              dropdownController.current = controller;
            }}
            direction={Platform.select({ios: 'down'})}
            dataSet={suggestionsList}
            onChangeText={getSuggestions}
            onSelectItem={item => {
              if (item) {
                onSelectOption(item);
              }
            }}
            debounce={600}
            suggestionsListMaxHeight={Dimensions.get('window').height * 0.5}
            onClear={onClearPress}
            // onOpenSuggestionsList={onOpenSuggestionsList}
            loading={loading}
            useFilter={false}
            textInputProps={{
              placeholder,
              autoCorrect: false,
              autoCapitalize: 'none',
              style: style.textInput,
            }}
            rightButtonsContainerStyle={style.rightButtonsContainer}
            inputContainerStyle={style.inputContainer}
            suggestionsListContainerStyle={style.suggestionsContainer}
            containerStyle={style.autocompleteContainer}
            renderItem={item => (
              <Text style={style.suggestion}>{item.title}</Text>
            )}
            inputHeight={50}
            showChevron={false}
            closeOnBlur={false}
          />
        </View>
      </AutocompleteDropdownContextProvider>
    );
  },
);

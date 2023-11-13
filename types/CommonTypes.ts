import {KeyboardTypeOptions} from 'react-native';
import {TAutocompleteDropdownItem} from 'react-native-autocomplete-dropdown';

export type ButtonProps = {
  title: string;
  isDisabled: boolean;
  onPress: () => void;
};

export type InputProps = {
  label: string;
  placeholder: string;
  onChangeText: (val: string) => void;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
};

type MenuOptions = {
  text: string;
  onSelect: () => void;
};

export type MenuProps = {
  trigger: JSX.Element;
  options: MenuOptions[];
};

export type AutocompleteOption = {
  [key: string]: string | {[key: string]: number} | null;
};

export type AutocompleteProps = {
  placeholder: string;
  findSuggestions: (
    value: string,
  ) => Promise<TAutocompleteDropdownItem[] | null>;
  onSelectOption: (item: AutocompleteOption) => void;
};

export type Nav = {
  navigate: (
    value: string,
    params?: {[key: string]: string | {[key: string]: number} | null},
  ) => void;
};

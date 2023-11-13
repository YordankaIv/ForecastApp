import React from 'react';
import {Text} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {MenuProps} from '../../types/CommonTypes';

const PopUpMenu: React.FC<MenuProps> = ({trigger, options}) => (
  <MenuProvider>
    <Menu>
      <MenuTrigger>{trigger}</MenuTrigger>
      <MenuOptions>
        {options.map((option, index) => (
          <MenuOption key={index} onSelect={option.onSelect}>
            <Text>{option.text}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  </MenuProvider>
);

export default PopUpMenu;

import {CELSIUS_LETTER, FAHRENHEIT_LETTER, FAHRENHEIT_UNIT} from './constants';

export const formatTemperature = (temp: number, unit: string) => {
  const formatedTemp = Math.ceil(temp);
  let unitLetter = CELSIUS_LETTER;
  if (unit === FAHRENHEIT_UNIT) {
    unitLetter = FAHRENHEIT_LETTER;
  }

  return formatedTemp + unitLetter;
};

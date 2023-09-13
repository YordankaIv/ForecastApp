import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

export type WeatherComponentProps = {
  locationData: {lat: string; lon: string};
  refreshing: boolean;
};

type WeatherDetails = {
  [key: string]: string | number;
};

export type ErrorComponentProps = {
  errorText: string;
  onPress?: (unit: string) => Promise<void>;
};

export type Weather = {
  name: string;
  main: {[key: string]: number};
  weather: Array<WeatherDetails>;
  coord: {[key: string]: number};
  wind: {[key: string]: number};
  clouds: {[key: string]: number};
  sys: WeatherDetails;
  dt: number;
};

export type WeatherHeaderProps = {
  weatherData: Weather;
  unit: string;
};

export type WeatherDescriptionProps = {
  weatherData: Weather;
  unit: string;
  handlePress: () => void;
};

export type WeatherItemProps = {
  label: string;
  value: string;
  icon: IconDefinition;
};

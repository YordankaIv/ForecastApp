import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

export type WeatherComponentProps = {
  location: {lat: number; lon: number};
  refreshing: boolean;
  getWeatherConditionId: (id: number) => void;
};

export type WeatherDetails = {
  [key: string]: string | number;
};

export type ErrorComponentProps = {
  errorText: string;
  onRefreshPress?: () => void;
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
  weather: Weather;
  unit: string;
};

export type Forecast = {
  date: string;
  icon: string | number;
  min_temp: string;
  max_temp: string;
  humidity: string;
};

export type WeatherWeekForecastProps = {
  weekForecast: Forecast[];
};

export type WeatherDescriptionProps = {
  weather: Weather;
  unit: string;
  onChangeUnit: () => void;
};

export type WeatherItemProps = {
  label: string;
  value: string;
  icon: IconDefinition;
};

export type SortOrder = 'asc' | 'desc';

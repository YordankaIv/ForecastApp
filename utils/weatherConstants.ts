import {faSun} from '@fortawesome/free-regular-svg-icons';
import {faWater, faWind} from '@fortawesome/free-solid-svg-icons';
import {faCloudflare} from '@fortawesome/free-brands-svg-icons';

export const weatherDetailsConstants = [
  [
    {
      label: 'Wind',
      icon: faWind,
    },
    {
      label: 'Humidity',
      icon: faWater,
    },
  ],
  [
    {
      label: 'Sunrise',
      icon: faSun,
    },
    {
      label: 'Sunset',
      icon: faSun,
    },
  ],
  [
    {
      label: 'Cloudiness',
      icon: faCloudflare,
    },
  ],
];

export const WeatherConditionIds = {
  SUNNY_WEATHER_CONDITION_ID: '8',
  FOGGY_WEATHER_CONDITION_ID: '7',
  SNOWY_WEATHER_CONDITION_ID: '6',
  HEAVY_RAINY_WEATHER_CONDITION_ID: '5',
  LIGHT_RAINY_WEATHER_CONDITION_ID: '3',
  STORM_WEATHER_CONDITION_ID: '2',
};

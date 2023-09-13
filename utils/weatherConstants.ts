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

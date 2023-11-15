import React from 'react';
import {View} from 'react-native';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import WeatherItem from '../WeatherItem/WeatherItem';
import {weatherDetailsConstants} from '../../utils/weatherConstants';

import style from './style';

const WeatherDetails: React.FC<{
  weatherDetails: {
    [key: string]: string;
  };
}> = ({weatherDetails}) => {
  return (
    <>
      {weatherDetails.wind ? (
        <View style={style.weatherDescriptionDetails}>
          {weatherDetailsConstants.map((detail, index) => (
            <View key={index} style={style.weatherDescription}>
              {detail.map((description, detailIndex) => (
                <WeatherItem
                  key={detailIndex + 'detail'}
                  icon={description.icon}
                  label={description.label}
                  value={weatherDetails[description.label.toLowerCase()]}
                />
              ))}
            </View>
          ))}
        </View>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
};

export default WeatherDetails;

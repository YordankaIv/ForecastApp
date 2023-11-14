import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Forecast, WeatherWeekForecastProps} from '../../types/WeatherTypes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Colors} from '../../utils/colorsConstants';
import {
  faChevronDown,
  faChevronUp,
  faDroplet,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  ASC_ORDER,
  DESC_ORDER,
  HUMIDITY,
  MAX,
  MAX_TEMP,
  MIN,
  MIN_TEMP,
} from '../../utils/constants';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const WeatherWeekForecast: React.FC<WeatherWeekForecastProps> = ({
  weekForecast,
}) => {
  const [sortedForecast, setSortedForecast] = useState<Forecast[] | []>(
    weekForecast,
  );
  const [isSorting, setIsSorting] = useState(false);
  const weatherDetailsToSort = [
    {label: HUMIDITY, order: ASC_ORDER},
    {label: MIN_TEMP, order: ASC_ORDER},
    {label: MAX_TEMP, order: ASC_ORDER},
  ];
  const [sortDetails, setSortDetails] = useState(weatherDetailsToSort);

  const sortWeatherDetail = (detail: string, order: string) => {
    const currentSortingOfDetails = [...weatherDetailsToSort];
    setIsSorting(true);

    const sortDetailIndex = currentSortingOfDetails.findIndex(
      weatherDetails => weatherDetails.label === detail,
    );

    if (sortDetailIndex !== undefined) {
      currentSortingOfDetails[sortDetailIndex].order =
        order === ASC_ORDER ? DESC_ORDER : ASC_ORDER;
      setSortDetails([...currentSortingOfDetails]);
    }

    const sortedWeekForecast = [...weekForecast];
    sortedWeekForecast.sort((day1, day2) =>
      +day1[detail].match(/[0-9]{2}/g)[0] > +day2[detail].match(/[0-9]{2}/g)[0]
        ? order === ASC_ORDER
          ? 1
          : -1
        : order === ASC_ORDER
        ? -1
        : 1,
    );

    setSortedForecast(sortedWeekForecast);
    setTimeout(() => setIsSorting(false), 2000);
  };

  return (
    <View style={style.weekWeatherContainer}>
      {!isSorting ? (
        <>
          <View style={style.sortToolsContainer}>
            <View style={style.sortInnerContainer}>
              {sortDetails.map((weatherDetail, index) => (
                <Pressable
                  style={style.smallDataSize}
                  key={index}
                  onPress={() =>
                    sortWeatherDetail(weatherDetail.label, weatherDetail.order)
                  }>
                  <FontAwesomeIcon
                    icon={
                      weatherDetail.order === ASC_ORDER
                        ? faChevronDown
                        : faChevronUp
                    }
                    size={15}
                    color={Colors.white}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          <>
            {sortedForecast.map((day, index) => (
              <View key={index} style={style.dayContainer}>
                <View style={style.maxContainerSize}>
                  <Image
                    source={{
                      uri: `http://openweathermap.org/img/w/${day.icon}.png`,
                    }}
                    resizeMode={'cover'}
                    style={style.icon}
                  />
                  <Text
                    style={[
                      style.weatherDetails,
                      globalStyle.RalewayFont,
                      globalStyle.normalWeight,
                      globalStyle.SSize,
                    ]}>
                    {day.date}
                  </Text>
                </View>
                <View style={style.smallDataSize}>
                  <FontAwesomeIcon
                    icon={faDroplet}
                    size={13}
                    color={Colors.white}
                  />
                  <Text style={style.weatherDetails}>{day.humidity}</Text>
                </View>
                <View style={style.smallDataSize}>
                  <Text style={style.weatherDetails}>{MIN}</Text>
                  <Text style={style.weatherDetails}>{day.min_temp}</Text>
                </View>
                <View style={style.smallDataSize}>
                  <Text style={style.weatherDetails}>{MAX}</Text>
                  <Text style={style.weatherDetails}>{day.max_temp}</Text>
                </View>
              </View>
            ))}
          </>
        </>
      ) : (
        <View style={style.loadingContainer}>
          <FontAwesomeIcon icon={faSpinner} size={25} color={Colors.white} />
        </View>
      )}
    </View>
  );
};

export default WeatherWeekForecast;

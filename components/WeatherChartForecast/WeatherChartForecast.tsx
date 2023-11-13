import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {WeatherWeekForecastProps} from '../../types/WeatherTypes';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../utils/colorsConstants';
import {CHART_LEGEND_LABEL} from '../../utils/constants';

const WeatherChartForecast: React.FC<WeatherWeekForecastProps> = ({
  weekForecast,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    labels: Array<string>;
    datasets: Array<{
      data: Array<number>;
      strokeWidth: number;
    }>;
    legend: Array<string>;
  }>({
    labels: [],
    datasets: [
      {
        data: [],
        strokeWidth: 2,
      },
    ],
    legend: [CHART_LEGEND_LABEL],
  });

  const chartConfig = {
    backgroundGradientFrom: Colors.darkCyanLimeGreen,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: Colors.blue,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 2,
    useShadowColorFromDataset: false,
  };
  const screenWidth = Dimensions.get('window').width;

  const prepareChartData = useCallback(async () => {
    const newData = {...data};
    weekForecast.forEach(weekday => {
      if (weekday.short_label) {
        newData.labels.push(weekday.short_label);
      }

      if (weekday.temp) {
        newData.datasets[0].data.push(+weekday.temp.replace(/\D/g, ''));
      }
    });

    setData(newData);
    setLoading(false);
  }, []);

  useEffect(() => {
    prepareChartData();
  }, [prepareChartData]);

  return (
    <View>
      {!loading && data.datasets[0].data && (
        <LineChart
          data={data}
          width={screenWidth}
          height={250}
          chartConfig={chartConfig}
        />
      )}
    </View>
  );
};

export default WeatherChartForecast;

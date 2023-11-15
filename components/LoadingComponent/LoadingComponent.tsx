import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import style from './style';

const LoadingComponent: React.FC = () => (
  <View style={style.indicatorContainer}>
    <ActivityIndicator size="large" />
  </View>
);

export default LoadingComponent;

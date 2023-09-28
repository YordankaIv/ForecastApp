import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {
  OFFLINE_PAGE_DESCRIPTION,
  OFFLINE_PAGE_HEADER,
} from '../../utils/constants';

import style from './style';

const OfflinePage: React.FC = () => (
  <SafeAreaView style={style.flex}>
    <View style={style.container}>
      <View>
        <Image
          resizeMode={'cover'}
          source={require('../../assets/images/offline.png')}
        />
      </View>
      <View style={style.textContainer}>
        <Text style={style.header}>{OFFLINE_PAGE_HEADER}</Text>
        <Text style={style.description}>{OFFLINE_PAGE_DESCRIPTION}</Text>
      </View>
    </View>
  </SafeAreaView>
);

export default OfflinePage;

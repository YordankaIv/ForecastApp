import React from 'react';
import {Alert, Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {
  OFFLINE_PAGE_DESCRIPTION,
  OFFLINE_PAGE_HEADER,
} from '../../utils/constants';
import {useNetInfo} from '@react-native-community/netinfo';

import style from './style';

const OfflinePage: React.FC = () => {
  const netInfo = useNetInfo();

  const checkConnection = () => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      Alert.alert('You are back online!');
    } else {
      Alert.alert('You are still offline!');
    }
  };

  return (
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
        <View>
          <Pressable onPress={() => checkConnection()} style={style.button}>
            <Text style={style.title}>Retry</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OfflinePage;

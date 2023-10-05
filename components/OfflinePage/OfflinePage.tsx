import React from 'react';
import {Alert, Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import {
  OFFLINE_PAGE_DESCRIPTION,
  OFFLINE_PAGE_HEADER,
  ONLINE_ALERT,
  OFFLINE_ALERT,
  OFFLINE_PAGE_BUTTON,
} from '../../utils/constants';
import {useNetInfo} from '@react-native-community/netinfo';

import style from './style';

const OfflinePage: React.FC = () => {
  const netInfo = useNetInfo();

  const checkConnection = () => {
    if (netInfo.isConnected && netInfo.isInternetReachable) {
      Alert.alert(ONLINE_ALERT);
    } else {
      Alert.alert(OFFLINE_ALERT);
    }
  };

  return (
    <SafeAreaView style={style.flex}>
      <View style={style.container}>
        <>
          <Image
            resizeMode={'cover'}
            source={require('../../assets/images/offline.png')}
          />
        </>
        <View style={style.textContainer}>
          <Text style={style.header}>{OFFLINE_PAGE_HEADER}</Text>
          <Text style={style.description}>{OFFLINE_PAGE_DESCRIPTION}</Text>
        </View>
        <>
          <Pressable onPress={() => checkConnection()} style={style.button}>
            <Text style={style.title}>{OFFLINE_PAGE_BUTTON}</Text>
          </Pressable>
        </>
      </View>
    </SafeAreaView>
  );
};

export default OfflinePage;

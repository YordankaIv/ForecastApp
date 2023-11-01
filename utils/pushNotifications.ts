import PushNotification from 'react-native-push-notification';
import {formatTemperature} from './utils';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {
  NOTIFICATIONS_CHANNEL_ID,
  NOTIFICATIONS_CHANNEL_NAME,
  NOTIFICATIONS_MESSAGE,
  NOTIFICATIONS_TITLE,
} from './constants';

PushNotification.configure({
  onRegister: token => console.log('Token', token),
  onNotification: notification => console.log('NOTIFICATION', notification),
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: NOTIFICATIONS_CHANNEL_ID,
    channelName: NOTIFICATIONS_CHANNEL_NAME,
  },
  created => console.log(`createChannel returned '${created}'`),
);

export const triggerPushNotification = async (
  currentTemp: number,
  currentLocation: string,
  metric: string,
) => {
  const temperature = formatTemperature(currentTemp, metric);
  const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  if (result === RESULTS.GRANTED) {
    PushNotification.localNotification({
      channelId: NOTIFICATIONS_CHANNEL_ID,
      title: NOTIFICATIONS_TITLE,
      message: `${NOTIFICATIONS_MESSAGE} ${currentLocation}, ${temperature}`,
      when: Math.floor(Date.now() / 1000),
    });
  }
};

import database from '@react-native-firebase/database';

export const getData = async (path: string, userId: string) => {
  return await database().ref(path).child(userId).once('value');
};

export const saveData = async <T>(path: string, userId: string, data: T) => {
  await database()
    .ref(path)
    .child(userId)
    .set(data)
    .catch((error: string) => {
      console.log('Storing Error', error);
    });
};

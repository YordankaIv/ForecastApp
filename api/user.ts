import auth from '@react-native-firebase/auth';
import {updateToken} from '../redux/reducers/User';
import store from '../redux/store';
import {
  USER_CREATE_ERROR,
  USER_INVALID_EMAIL_ERROR,
  USER_IN_USE_EMAIL_ERROR,
} from '../utils/constants';

export const createUser = async (
  fullName: string,
  email: string,
  password: string,
) => {
  try {
    const user = await auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: fullName});
    return user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return {error: USER_IN_USE_EMAIL_ERROR};
    } else if (error.code === 'auth/invalid-email') {
      return {error: USER_INVALID_EMAIL_ERROR};
    }

    return {error: USER_CREATE_ERROR};
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();
    return {
      status: true,
      data: {
        displayName: response.user.displayName,
        email: response.user.email,
        token,
      },
    };
  } catch (error: any) {
    return {status: false, error: error.message};
  }
};

export const logout = async () => {
  await auth().signOut();
};

export const checkToken = async () => {
  try {
    const response = await auth().currentUser?.getIdToken(true);
    store.dispatch(updateToken(response));
    return response;
  } catch (error) {
    return error;
  }
};

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  ImageBackground,
} from 'react-native';
import {
  BACKGROUND_IMAGE_LOGIN_URI,
  EMAIL_FIELD_LABEL,
  EMAIL_FIELD_PLACEHOLDER,
  LOGIN_BUTTON_TITLE,
  PASSWORD_FIELD_LABEL,
  PASSWORD_FIELD_PLACEHOLDER,
  REGISTRATION_BUTTON_LABEL,
} from '../../utils/constants';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {Routes} from '../../navigation/Routes';
import {loginUser} from '../../api/user';
import {logIn} from '../../redux/reducers/User';
import {useNavigation} from '@react-navigation/native';
import {Nav} from '../../types/CommonTypes';

import style from './style';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={style.flex}>
      <ImageBackground
        source={{
          uri: BACKGROUND_IMAGE_LOGIN_URI,
        }}
        resizeMode={'cover'}
        style={style.image}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}>
          <View style={style.loginForm}>
            <View>
              <Input
                keyboardType={'email-address'}
                label={EMAIL_FIELD_LABEL}
                placeholder={EMAIL_FIELD_PLACEHOLDER}
                onChangeText={value => setEmail(value)}
              />
            </View>
            <View>
              <Input
                secureTextEntry={true}
                label={PASSWORD_FIELD_LABEL}
                placeholder={PASSWORD_FIELD_PLACEHOLDER}
                onChangeText={value => setPassword(value)}
              />
            </View>
          </View>
          {error.length > 0 && <Text style={style.error}>{error}</Text>}
          <View style={style.loginButton}>
            <Button
              title={LOGIN_BUTTON_TITLE}
              isDisabled={email.length < 5 || password.length < 6}
              onPress={async () => {
                const user = await loginUser(email, password);
                if (!user.status) {
                  setError(user.error);
                } else {
                  setError('');
                  dispatch(logIn(user.data));
                  navigation.navigate(Routes.Home);
                }
              }}
            />
          </View>
          <Pressable
            style={style.registrationButton}
            onPress={() => navigation.navigate(Routes.Registration)}>
            <Text style={style.registrationLabel}>
              {REGISTRATION_BUTTON_LABEL}
            </Text>
          </Pressable>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

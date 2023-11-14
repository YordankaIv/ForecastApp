import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
} from 'react-native';

import {createUser} from '../../api/user';
import {Routes} from '../../navigation/Routes';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {
  BACKGROUND_IMAGE_LOGIN_URI,
  EMAIL_FIELD_LABEL,
  EMAIL_FIELD_PLACEHOLDER,
  NAME_FIELD_LABEL,
  NAME_FIELD_PLACEHOLDER,
  PASSWORD_FIELD_LABEL,
  PASSWORD_FIELD_PLACEHOLDER,
  REGISTRATION_BUTTON_TITLE,
  REGISTRATION_SUCCESS_RESULT,
} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {Nav} from '../../types/CommonTypes';

import style from './style';
import globalStyle from '../../assets/styles/globalStyle';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={globalStyle.flex}>
      <ImageBackground
        source={{
          uri: BACKGROUND_IMAGE_LOGIN_URI,
        }}
        resizeMode={'cover'}
        style={globalStyle.image}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}>
          <View style={style.registerForm}>
            <View>
              <Input
                label={NAME_FIELD_LABEL}
                placeholder={NAME_FIELD_PLACEHOLDER}
                onChangeText={value => setName(value)}
              />
            </View>
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
          {error.length > 0 && <Text style={globalStyle.error}>{error}</Text>}
          {success.length > 0 && (
            <Text style={globalStyle.success}>{success}</Text>
          )}
          <View>
            <Button
              isDisabled={
                name.length <= 2 || email.length <= 5 || password.length <= 6
              }
              title={REGISTRATION_BUTTON_TITLE}
              onPress={async () => {
                const user = await createUser(name, email, password);
                if (user.error) {
                  setError(user.error);
                } else {
                  setError('');
                  setSuccess(REGISTRATION_SUCCESS_RESULT);
                  setTimeout(() => navigation.navigate(Routes.Login), 3000);
                }
              }}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Registration;

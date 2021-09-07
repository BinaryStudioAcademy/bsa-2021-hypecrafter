import React, { FC, useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Routes } from '../../common/enums';
import { UserAuthorizationKey } from '../../common/enums/user/user-authorization-key';
import { colors } from '../../common/styles/colors';
import { useTypedSelector } from '../../hooks/store';
import { useAction } from '../../hooks/useAction';
import NavigationService from '../../navigation';

const LoginView: FC = () => {

  const [hidePass, setHidePass] = useState(true);
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [errMess, setErrMess] = useState('');

  const { loginAction } = useAction();

  const store = useTypedSelector(
    ({ authentication: { tokens, isLoading, error } }) => ({
      accessToken: tokens?.accessToken,
      refreshToken: tokens?.refreshToken,
      isLoading,
      error
    })
  );
  const { refreshToken, error } = store;

  useEffect(() => {
    if (refreshToken) {
      NavigationService.navigate(Routes.APP);
    }
  }, [refreshToken]);

  useEffect(() => {
    if (error) {
      setErrMess('Email or password is invalid');
    }
  }, [error]);

  const onChange = (name: string, value: string) => {
    setUserData({ ...userData, [name]: value });
  };

  const onEmailChange = (value: string) => {
    onChange(UserAuthorizationKey.EMAIL, value);
  };

  const onPasswordChange = (value: string) => {
    onChange(UserAuthorizationKey.PASSWORD, value);
  };


  const onEyePressed = () => {
    setHidePass(!hidePass);
  };

  const onLogin = () => {
    loginAction(userData);
  };


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.wrapper}>
      <View style={styles.wrapper}>
        <ImageBackground source={require('./../../assets/images/login_bg.jpg')} resizeMode="cover" style={styles.imageBg}>
          <Image
            source={require('./../../assets/images/HypeCrafter.png')}
            style={styles.img}
            resizeMode="stretch"
          />
        </ImageBackground>
        <View style={styles.container}>
          <Text style={[styles.text, styles.loginText]}>Log In</Text>
          <Text style={[styles.text, styles.subloginText]}>Don't have an account? <Text style={styles.signUp}>Sign Up</Text></Text>
          <Text style={[styles.text, styles.inputName]}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={onEmailChange}
            value={userData.email}
          />
          <Text style={[styles.text, styles.inputName]}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={[styles.input, styles.passwordInput]}
              onChangeText={onPasswordChange}
              value={userData.password}
              secureTextEntry={hidePass ? true : false}
            />
            <Icon
              name={hidePass ? 'eye' : 'eye-slash'}
              size={25}
              style={styles.passwordIcon}
              color='white'
              onPress={onEyePressed}
            />
          </View>
          {errMess ? <Text style={styles.error}>{errMess}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.color_root_background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  error: {
    color: 'red'
  },
  text: {
    color: 'white'
  },
  inputName: {
    fontSize: 16
  },
  loginText: {
    fontSize: 35,
    color: colors.color_root_turquoise
  },
  signUp: {
    color: colors.color_root_turquoise
  },
  subloginText: {
    fontSize: 20,
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.color_root_turquoise,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomWidth: 0,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
  },
  imageBg: {
    justifyContent: "center",
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  img: {
    width: '95%',
    height: 60
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    width: '100%',
    fontSize: 16,
    alignItems: 'center',
    color: 'white'
  },
  passwordContainer: {
    flexDirection: 'row',
    borderColor: '#000',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 40,
  },
  passwordIcon: {
    marginLeft: -35,
    paddingVertical: 13,
  },
});
export default LoginView;

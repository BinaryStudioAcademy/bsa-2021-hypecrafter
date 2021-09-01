import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Routes } from '../../common/enums';

const LoginView = ({navigation} : {navigation: any}) => {
  const onLogin = async () => {
      navigation.navigate(Routes.APP);
  };
  return (
    <View style={styles.wrapper}>
      <Text>Login</Text>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0,
    borderRadius: 5,
    width: '30%',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
export default LoginView;

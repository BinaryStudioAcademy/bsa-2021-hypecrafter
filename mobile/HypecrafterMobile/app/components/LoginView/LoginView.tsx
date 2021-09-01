import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LoginView = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  }
});
export default LoginView;

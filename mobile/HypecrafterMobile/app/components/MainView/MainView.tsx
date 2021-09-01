import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MainView = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Main page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
export default MainView;

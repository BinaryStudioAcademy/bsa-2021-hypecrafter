import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import commonStyles from '../../styles/common';

const UserView = () => {
  return (
    <View style={styles.container}>
      <Text>UserPage</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: commonStyles.color.grey,
  },
})

export default UserView;

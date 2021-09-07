import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MainView = ({navigation} : {navigation: any}) => {
  const onLogOut = async () => {
    navigation.navigate('Auth');
  };
  return (
    <View style={styles.wrapper}>
       <TouchableOpacity style={styles.button} onPress={onLogOut}>
        <Text style={styles.buttonText}>Back to login</Text>
      </TouchableOpacity>
      <Text>Main page</Text>
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
export default MainView;

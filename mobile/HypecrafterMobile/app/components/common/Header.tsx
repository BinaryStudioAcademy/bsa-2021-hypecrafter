import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import commonStyles from '../../styles/common';


const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <Text style={styles.balanceText}>1500</Text>
        <Image style={styles.balanceImg} source={require('../../assets/images/HypeCoin.png')} />
      </View>
      <View style={styles.logo}>
        <Image style={styles.logoImg} source={require('../../assets/images/HypeCrafter.png')} />
      </View>
      <View style={styles.user}>
        <Image style={styles.userAvatar} source={{
          uri: 'https://source.unsplash.com/random',
          method: 'POST',
          headers: {
            Pragma: 'no-cache'
          }
        }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: commonStyles.color.grey,
    position: 'relative',
  },
  balance: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceText: {
    fontWeight: '700',
    fontSize: 16,
    color: commonStyles.color.text,
    marginRight: 5,
  },
  balanceImg: {
    width: 20,
    height: 20,
  },
  logo: {
    height: 20,
    width: 150,
    position: 'absolute',
    top: 12,
    left: '30%',
  },
  logoImg: {
    height: 20,
    width: 'auto',
  },
  user: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  userAvatar: {
    height: 40,
    width: 40,
  }
});

export default Header;

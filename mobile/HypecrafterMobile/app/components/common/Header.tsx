import React, { FC, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import NavigationService from '../../navigation';
import { Routes } from '../../common/enums';
import commonStyles from '../../styles/common';

interface Props {
  navigation: StackNavigationProp;
}

const Header:FC<Props> = ({ navigation }) => {
  const [displayBalance, setDisplayBalance] = useState(true);
  
  const handleUserProfile = () => NavigationService.navigate(Routes.USER);

  useEffect(() => {
    if (navigation.state.routeName != Routes.MAIN) setDisplayBalance(false);
  }, [navigation.state.routeName])


  return (
    <View style={displayBalance ? styles.container : styles.containerAlt}>
      {displayBalance && 
      (<View style={styles.balance}>
        <Text style={styles.balanceText}>1500</Text>
        <Image style={styles.balanceImg} source={require('../../assets/images/HypeCoin.png')} />
      </View>)}
      <View style={displayBalance ? styles.logo : styles.logoAlt}>
        <Image style={styles.logoImg} source={require('../../assets/images/HypeCrafter.png')} />
      </View>
      <View style={styles.user}>
        <TouchableOpacity onPress={handleUserProfile}>
          <Image style={styles.userAvatar} source={{ uri: 'https://source.unsplash.com/random' }} />
        </TouchableOpacity>
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
  containerAlt: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  logoAlt: {
    height: 20,
    width: 150,
    position: 'absolute',
    top: 12,
    left: '16%',
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

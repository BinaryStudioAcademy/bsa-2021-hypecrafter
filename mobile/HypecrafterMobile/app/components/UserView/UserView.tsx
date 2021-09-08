import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAction, useTypedSelector } from '../../hooks';
import commonStyles from '../../styles/common';

const UserView = () => {
  const store = useTypedSelector(({ userPage: { item, isLoading } }) => ({
    userPage: item,
    isLoading,
  }));
  const { fetchUserProfileAction } = useAction();
  const userId = 'ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529';
  const avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

  const { userPage, isLoading } = store;
  console.log(userPage);

  useEffect(() => {
    fetchUserProfileAction(userId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: avatarUrl}} />
      </View>
      <Text style={styles.name}>
        {`${userPage?.firstName} ${userPage?.lastName}`}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: commonStyles.color.grey,
  },
  avatarContainer: {
    height: 200,
    width: 200,
    overflow: 'hidden',
    marginVertical: 20,
  },
  avatar: {
    height: 200,
    width: 'auto',
    borderRadius: 100,
  },
  name: {
    fontSize: commonStyles.font.size.large,
    fontWeight: '600',
    color: commonStyles.color.text,
  }
})

export default UserView;

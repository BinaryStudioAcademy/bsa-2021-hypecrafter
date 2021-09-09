import React, { useEffect } from 'react';
import { FlatList, Image, ListRenderItem, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import { logout } from '../../helpers';
import { useAction, useTypedSelector } from '../../hooks';
import NavigationService from '../../navigation';
import commonStyles from '../../styles/common';
import ProjectCard from '../common/ProjectCard';

const renderItem: ListRenderItem<Project> = ({ item }) => (
  <ProjectCard project={item} userPage={true} />
);

const UserView = () => {
  const store = useTypedSelector(({ userPage: { item, isLoading }, mainPage: { popular } }) => ({
    userPage: item,
    popularStartups: popular,
    isLoading,
  }));
  const { fetchUserProfileAction, logoutAction } = useAction();
  const userId = 'ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529';
  const avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

  const { userPage, isLoading, popularStartups } = store;

  const handleLogout = () => {
    logoutAction();
    logout();
    NavigationService.navigate(Routes.AUTH);
  }

  useEffect(() => {
    fetchUserProfileAction(userId);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: avatarUrl }} />
        </View>
        <Text style={styles.name}>
          {`${userPage?.firstName} ${userPage?.lastName}`}
        </Text>
        <Text style={styles.email}>{userPage?.email}</Text>
        <View style={styles.region}>
          <Icon name={'map-marker-alt'} size={20} color='white' />
          <Text style={styles.regionName}>{userPage?.region}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionHeader}>About Me</Text>
          <Text style={styles.descriptionText}>{userPage?.description}</Text>
        </View>
        <Text style={styles.projectsHeader}>Projects</Text>
        <SafeAreaView style={styles.flatListContainer}>
          <FlatList
            data={popularStartups}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
          />
        </SafeAreaView>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerScroll: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: commonStyles.color.background,
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
  },
  email: {
    fontSize: commonStyles.font.size.title,
    color: commonStyles.color.text,
  },
  region: {
    flexDirection: 'row',
    marginTop: 6,
  },
  regionName: {
    marginHorizontal: 5,
    fontSize: commonStyles.font.size.title,
    fontWeight: '500',
    color: commonStyles.color.text,
  },
  description: {
    backgroundColor: commonStyles.color.blockBackground,
    marginHorizontal: 12,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  descriptionHeader: {
    color: commonStyles.color.text,
    fontSize: commonStyles.font.size.title,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 4,
  },
  descriptionText: {
    color: commonStyles.color.text,
    fontSize: commonStyles.font.size.text,
  },
  projectsHeader: {
    color: commonStyles.color.text,
    fontSize: commonStyles.font.size.title,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  flatListContainer: {
    height: 350,
    marginBottom: 20,
    overflow: 'hidden',
  },
  logoutContainer: {
    width: '100%',
    height: 40,
    borderTopWidth: 1,
    borderTopColor: commonStyles.color.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    color: '#B23B3B',
    fontSize: commonStyles.font.size.title,
  }
})

export default UserView;

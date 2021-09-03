import React, { FC } from 'react';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet } from 'react-native';
import { Project } from '../../../common/types';
import ProjectCard from '../../common/ProjectCard';

interface Props {
  popularStartups: Project[];
}

const PopularScreen:FC<Props> = ({ popularStartups }) => {
  const renderItem: ListRenderItem<Project> = ({ item }) => (
    <ProjectCard project={item} />
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={popularStartups}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#191b1f',
  },
});

export default PopularScreen;
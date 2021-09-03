import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, FlatList, ListRenderItem } from 'react-native';
import ProjectCard from '../../common/ProjectCard';
import { Project } from '../../../common/types';

interface Props {
  recommendedStartups: Project[]
}

const RecommendedScreen:FC<Props> = ({ recommendedStartups }) => {
  const renderItem: ListRenderItem<Project> = ({ item }) => (
    <ProjectCard project={item} />
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={recommendedStartups}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191b1f',
  },
});

export default RecommendedScreen;
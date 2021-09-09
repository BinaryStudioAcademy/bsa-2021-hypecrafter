import React, { FC } from 'react';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet } from 'react-native';
import { Project } from '../../../common/types';
import commonStyles from '../../../styles/common';
import ProjectCard from '../../common/ProjectCard';

interface Props {
  popularStartups: Project[];
  recommendedStartups: Project[];
  target: string;
}

const renderItem: ListRenderItem<Project> = ({ item }) => (
  <ProjectCard project={item} />
);

const ProjectsScreen: FC<Props> = ({ popularStartups, recommendedStartups, target }) => {
  let renderData;
  switch (target) {
    case 'popular':
      renderData = popularStartups;
      break;
    case 'recommended':
      renderData = recommendedStartups;
      break;
    default:
      renderData = popularStartups;
      break;
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        data={renderData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: commonStyles.color.background,
  },
});

export default ProjectsScreen;
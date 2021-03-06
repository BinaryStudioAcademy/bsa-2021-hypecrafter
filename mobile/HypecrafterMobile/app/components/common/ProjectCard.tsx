import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Routes } from '../../common/enums';
import { Project } from '../../common/types';
import NavigationService from '../../navigation';
import commonStyles from '../../styles/common';
import Tag from './Tag';

interface Props {
  project: Project;
  userPage?: boolean;
}

const ProjectCard: FC<Props> = ({ project, userPage }) => {

  const renderTags = (tag: string, index: number, arr: string[]) => {
    const key = `${project.id}${index}`
    if (index > 3) return
    if (index > 2) return <Tag name={`+${arr.length - index - 1}`} key={key} />
    return <Tag name={tag} key={key} />
  };

  const onProjectTouch = () => {
    NavigationService.navigate(Routes.PROJECT, { id: project.id });
  }

  return (
    <View style={userPage ? styles.containerAlt : styles.container}>
      <TouchableOpacity onPress={onProjectTouch} >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: project.imageUrl || 'https://source.unsplash.com/random' }} />
        </View>
        <Text style={styles.category}>{project.category}</Text>
        <Text style={styles.name}>{project.name}</Text>
        <Text style={styles.description}>{project.description}</Text>
        <View style={styles.tags}>
          {project.tags.map(renderTags)}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    backgroundColor: commonStyles.color.blockBackground,
    borderRadius: 4,
    marginVertical: 6,
  },
  containerAlt : {
    width: 360,
    backgroundColor: commonStyles.color.blockBackground,
    borderRadius: 4,
    marginVertical: 6,
    marginLeft: 12,
  },
  imageContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: 'auto',
  },
  category: {
    color: commonStyles.color.turquoise,
    marginHorizontal: 8,
    marginTop: 5,
  },
  name: {
    color: commonStyles.color.text,
    fontSize: commonStyles.font.size.title,
    fontWeight: '600',
    marginVertical: 5,
    marginHorizontal: 8,
  },
  description: {
    color: commonStyles.color.text,
    fontSize: commonStyles.font.size.text,
    fontWeight: '400',
    marginHorizontal: 8,
  },
  tags: {
    marginHorizontal: 8,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
  }
});

export default ProjectCard;

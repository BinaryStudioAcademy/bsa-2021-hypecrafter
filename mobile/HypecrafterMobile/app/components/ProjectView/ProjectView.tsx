import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { useTypedSelector } from '../../hooks/store';
import { useAction } from '../../hooks/useAction';

const ProjectView = () => {
  const navigation = useNavigation();
  const { fetchProject } = useAction();
  const { project, isLoading } = useTypedSelector(
    (
      { projectPage }
    ) => ({
      project: projectPage.project,
      isLoading: projectPage.isLoading,
    })
  );
  useEffect(() => {
    fetchProject({ id: navigation.getParam('id'), userId: undefined });
  }, []);
  return (
    <View>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text>{project.name}</Text>
    </View>
  );
}

export default ProjectView;
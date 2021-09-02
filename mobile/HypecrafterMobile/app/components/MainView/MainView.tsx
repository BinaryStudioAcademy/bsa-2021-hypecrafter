import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTypedSelector } from '../../hooks/store';
import { useAction } from '../../hooks/useAction';

const MainView = ({navigation} : {navigation: any}) => {
  const { fetchPopularAndRecommendedProjectsAction, fetchTopics } = useAction();

  const {
    popular: popularStartups,
    recommended: recommendedStartups,
    isLoading: isStartupsLoading,
    topics,
  } = useTypedSelector(({ mainPage }) => ({
    popular: mainPage.popular,
    recommended: mainPage.recommended,
    isLoading: mainPage.isLoading,
    topics: mainPage.topics,
  }));

  const onLogOut = async () => {
    navigation.navigate('Auth');
  };

  useEffect(() => {
    fetchPopularAndRecommendedProjectsAction();
    fetchTopics();
  }, []);
  
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

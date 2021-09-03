import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/store';
import { useAction } from '../../hooks/useAction';
import PopularScreen from './screens/PopularScreen';
import RecommendedScreen from './screens/RecommendedScreen';

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

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    fetchPopularAndRecommendedProjectsAction();
    fetchTopics();
  }, []);
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#474a4f' },
        tabBarLabelStyle: { fontWeight: '500', color: 'white' },
      }}
    >
      <Tab.Screen
        name="Popular"
        children={() => (<PopularScreen popularStartups={popularStartups}/>)}
      />
      <Tab.Screen
        name="Recommended"
        children={() => (<RecommendedScreen recommendedStartups={recommendedStartups}/>)}
      />
    </Tab.Navigator>
  );
};

export default MainView;

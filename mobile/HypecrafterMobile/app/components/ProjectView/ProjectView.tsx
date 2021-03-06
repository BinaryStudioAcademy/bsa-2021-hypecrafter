import React, { FC, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import { Mark } from '../../common/enums';
import { colors } from '../../common/styles/colors';
import { calcDaysToGo, calcDonationProgress } from '../../helpers/project';
import { useTypedSelector } from '../../hooks/store';
import { useAction } from '../../hooks/useAction';
import { useAuth } from '../../hooks/useAuth';
import ProgressBar from '../common/ProgressBar';
import CommentsView from './screens/Comments';
import FAQView from './screens/FAQ';
import StoryView from './screens/Story';

const ProjectView: FC = () => {
  const navigation = useNavigation();
  const { id: userId } = useAuth();
  const [screenNum, setScreenNum] = useState(1)
  const { fetchProject, setWatch, setReaction } = useAction();
  const { project, isLoading } = useTypedSelector(
    (
      { projectPage }
    ) => ({
      project: projectPage.project,
      isLoading: projectPage.isLoading,
    })
  );

  const daysToGo = calcDaysToGo(project.finishDate);

  const handleLike = () => {
    setReaction({ isLiked: project.mark === Mark.LIKE ? null : true, projectId: project.id });
  };

  const handleDislike = () => {
    setReaction({ isLiked: project.mark === Mark.DISLIKE ? null : false, projectId: project.id });
  };

  const handleWatch = () => {
    setWatch({ isWatched: !project.isWatched, projectId: project.id });
  };

  useEffect(() => {
    fetchProject({ id: navigation.getParam('id'), userId });
  }, []);
  return (
    <View style={{ flexGrow: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.root_background }} contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={{
            uri: project.imageUrl || 'https://source.unsplash.com/random/800x600',
          }}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={styles.wrapper}>
          <View style={styles.projectMainInfo}>
            <Text style={[styles.text, styles.category]}>{project.category}</Text>
            <Text style={[styles.text, styles.name]}>{project.name}</Text>
            <Text style={[styles.text, styles.description]}>{project.description}</Text>
          </View>
          <Icon
            name={project.isWatched ? 'bookmark' : 'bookmark-o'}
            size={35}
            color='white'
            onPress={handleWatch}
            style={{marginTop: 36}}
          />
        </View>
        <View style={styles.projectInfo}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.container}>
              <Text style={[styles.text, styles.amount]}>{project.bakersAmount}</Text>
              <Text style={styles.text}>Backers</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.donatedContainer}>
                <Text style={[styles.text, styles.amount, styles.donated]}>{project.donated}</Text>
                <Image
                  source={require('./../../assets/images/HypeCoin.png')}
                  style={styles.imgCoin}
                  resizeMode="stretch"
                />
              </View>
              <Text style={styles.text}>Donated</Text>
            </View>
            <View style={styles.container}>
              <Text style={[styles.text, styles.amount]}>{daysToGo < 0 ? 'Ended' : daysToGo}</Text>
              <Text style={styles.text}>Days to go</Text>
            </View>
          </View>
          <ProgressBar goal={project.goal} percent={calcDonationProgress(project.donated, project.goal)} />
          <View style={styles.marks}>
            <Icon
              style={styles.like}
              name={project.mark === Mark.LIKE ? 'thumbs-up' : 'thumbs-o-up'}
              size={30}
              color='white'
              onPress={handleLike}
            />
            <Text style={styles.marksAmount}>{project.likes ? project.likes : 0}</Text>
            <Icon
              style={styles.dislike}
              name={project.mark === Mark.DISLIKE ? 'thumbs-down' : 'thumbs-o-down'}
              size={30}
              color='white'
              onPress={handleDislike}
            />
            <Text style={styles.marksAmount}>{project.dislikes ? project.dislikes : 0}</Text>
          </View>
        </View>
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <Pressable onPress={() => setScreenNum(1)}>
              <Text style={screenNum === 1 ? styles.tabTextChosen : styles.tabText}>
                Story
              </Text>
            </Pressable>
          </View>
          <View style={styles.tab}>
            <Pressable onPress={() => setScreenNum(2)}>
            <Text style={screenNum === 2 ? styles.tabTextChosen : styles.tabText}>
                FAQ
              </Text>
            </Pressable>
          </View>
          <View style={styles.tab}>
            <Pressable onPress={() => setScreenNum(3)}>
            <Text style={screenNum === 3 ? styles.tabTextChosen : styles.tabText}>
                Comments
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.tabCont}>
          {screenNum === 1 && <StoryView story={project.story} />}
          {screenNum === 2 && <FAQView faq={project.FAQ} />}
          {screenNum === 3 && <CommentsView comments={project.projectComments} projectId={project.id} />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 300,
    marginBottom: 6,
  },
  imgCoin: {
    width: 30,
    height: 30,
    marginLeft: 5,
    aspectRatio: 1,
  },
  tab: {
    marginLeft: 10,
  },
  tabCont: {
    marginHorizontal: 20
  },
  tabText: {
    fontSize: 22,
    color: 'white',
  },
  tabTextChosen: {
    fontSize: 22,
    color: colors.root_turquoise,
  },
  tabContainer: { 
    flexDirection: 'row', 
    width: '100%', 
    marginVertical: 10,
    marginHorizontal: 10,
  },
  marks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  marksAmount: {
    fontSize: 20,
    color: 'white',
    marginRight: 10
  },
  links: {
    flexDirection: 'row',
    margin: 10
  },
  link: {
    marginLeft: 10
  },
  like: {
    color: '#25c685',
    marginRight: 5
  },
  dislike: {
    color: '#ff575f',
    marginRight: 5
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 20
  },
  name: {
    fontSize: 22,
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  donated: {
    fontSize: 32,
    color: colors.root_turquoise
  },
  category: {
    color: colors.root_turquoise,
    marginBottom: 6
  },
  donatedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectInfo: {
    backgroundColor: colors.root_block_background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    borderRadius: 10
  },
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  projectMainInfo: {
    width: '90%'
  }
});

export default ProjectView;
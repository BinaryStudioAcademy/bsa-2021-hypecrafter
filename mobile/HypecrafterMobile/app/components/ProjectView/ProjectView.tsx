import React, { useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from 'react-navigation-hooks';
import { Mark } from '../../common/enums';
import { colors } from '../../common/styles/colors';
import { calcDaysToGo, calcDonationProgress } from '../../helpers/project';
import { useTypedSelector } from '../../hooks/store';
import { useAction } from '../../hooks/useAction';
import ProgressBar from '../common/ProgressBar';

const ProjectView = () => {
  const navigation = useNavigation();
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
    fetchProject({ id: navigation.getParam('id'), userId: undefined });
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.color_root_background }}>
      <View style={{ flex: 1 }}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Image
          source={{
            uri: project.imageUrl || 'https://source.unsplash.com/random/800x600',
          }}
          style={styles.img}
          resizeMode="stretch"
        />
        <View style={styles.wrapper}>
          <View>
            <Text style={[styles.text, styles.category]}>{project.category}</Text>
            <Text style={[styles.text, styles.name]}>{project.name}</Text>
            <Text style={styles.text}>{project.description}</Text>
          </View>
          <Icon
            name={project.isWatched ? 'bookmark' : 'bookmark-o'}
            size={40}
            color='white'
            onPress={handleWatch}
          />
        </View>
        <View style={styles.links}>
          <Icon
            name={'instagram'}
            size={30}
            color='white'
          />
          <Icon
            style={styles.link}
            name={'facebook'}
            size={30}
            color='white'
          />
          <Icon
            style={styles.link}
            name={'dribbble'}
            size={30}
            color='white'
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    aspectRatio: 1,
  },
  imgCoin: {
    width: 30,
    height: 30,
    marginLeft: 5,
    aspectRatio: 1,
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
    fontSize: 25
  },
  name: {
    fontSize: 25,
    marginBottom: 10
  },
  donated: {
    fontSize: 35,
    color: colors.color_root_turquoise
  },
  category: {
    color: colors.color_root_turquoise,
    marginBottom: 15
  },
  donatedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectInfo: {
    backgroundColor: colors.color_root_block_background,
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 10
  },
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  text: {
    fontSize: 20,
    color: 'white'
  }
});

export default ProjectView;
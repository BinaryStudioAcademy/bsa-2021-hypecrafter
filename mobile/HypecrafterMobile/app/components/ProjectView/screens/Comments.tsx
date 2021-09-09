import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from '../../../common/styles/colors';


interface CommentProps {
  comment: {
    id: string;
    author: {
      firstName: string;
      lastName: string;
      avatar?: string;
      isBacker?: boolean;
      isOwner?: boolean;
    };
    createdAt: string;
    message: string;
  }
}
export interface Comment {
  id: string;
  author: {
    id: string;
    firstName: string;
    avatar: string;
    isOwner: boolean;
    isBacker: boolean;
    lastName: string;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
  parentCommentId: string;
}

interface CommentsProps {
  comments: Comment[];
}

const CommentsView: FC<CommentsProps> = ({ comments }) => {
  return (
    <View>
      {
        comments.map((el) => (
          <Comment key={el.id} comment={el} />
        ))
      }
    </View>
  )
}

const Comment: FC<CommentProps> = ({
  comment: {
    author: {
      firstName,
      lastName,
      avatar = 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png',
      isBacker = false,
      isOwner = false,
    },
    createdAt,
    message
  }
}) => {

  const roleBacker = !isOwner && isBacker;
  const role = () => {
    if (isOwner) return 'OWNER';
    if (roleBacker) return 'BACKER';
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View>
          <Image style={styles.avatar} source={{ uri: avatar }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{firstName} {lastName}</Text>
          {isBacker && <View style={styles.backer}>
            <Text>{role()}</Text>
          </View>}
        </View>
      </View>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  backer: {
    backgroundColor: colors.badge_backer_background,
    padding: 2,
    borderRadius: 5,
    marginLeft: 10
  },
  infoContainer: {
    flexDirection: 'row',
    marginLeft: 10
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  text: {
    color: 'white'
  }
})

export default CommentsView;

import React, { FC, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { colors } from '../../../common/styles/colors';
import { useAction } from '../../../hooks';
import { useAuth } from '../../../hooks/useAuth';


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
  projectId: string;
}

const CommentsView: FC<CommentsProps> = ({ comments, projectId }) => {
  const [comment, setComment] = useState('');
  const { addComment } = useAction();
  const { id, isAuthorized } = useAuth();

  const onCommentChange = (value: string) => {
    setComment(value)
  }

  const onSend = () => {
    if (id) {
      addComment({
        message: comment,
        project: projectId,
        author: id.toString()
      });
      setComment('');
    }
  }
  return (
    <View>
      <View style={styles.containerCommentInput}>
        <TextInput
          placeholder="Write a comment!"
          style={styles.input}
          onChangeText={onCommentChange}
          value={comment}
        />
        <View>
          <TouchableWithoutFeedback onPress={onSend}>
            <View style={{ backgroundColor: colors.root_turquoise, padding: 12, borderRadius: 5, marginLeft: 5 }}>
              <Text style={{ color: 'black', fontSize: 20 }}>Send</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
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
  containerCommentInput: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    marginBottom: 10
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    width: '80%',
    fontSize: 16,
    alignItems: 'center',
    color: 'white'
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

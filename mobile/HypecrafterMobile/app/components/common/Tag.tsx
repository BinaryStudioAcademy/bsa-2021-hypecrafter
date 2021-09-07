import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import commonStyles from '../../styles/common';

interface Props {
  name: string;
}

const Tag:FC<Props> = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tag}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: commonStyles.color.grey,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 6,
    borderRadius: 4
  },
  tag: {
    color: commonStyles.color.text,
  }
});

export default Tag;

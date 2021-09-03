import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
    backgroundColor: '#474a4f',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginRight: 6,
    borderRadius: 4
  },
  tag: {
    color: '#fafbff',
  }
});

export default Tag;

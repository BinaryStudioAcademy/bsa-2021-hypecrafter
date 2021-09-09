import React, { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from '../../common/styles/colors';

const Accordion = ({ question, answer }: { question: string, answer: string }) => {
  const [expanded, setExpanded] = useState(false)

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
        <Text style={[styles.title]}>{question}</Text>
        <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'white'} />
      </TouchableOpacity>
      {
        expanded &&
        <View style={styles.child}>
          <Text style={[styles.answer]}>{answer}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  answer: {
    fontSize: 14,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.root_turquoise
  },
  child: {
    backgroundColor: colors.root_grey,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: colors.root_turquoise,
    padding: 16,
  }
});

export default Accordion
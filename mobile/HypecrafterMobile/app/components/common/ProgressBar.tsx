import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { colors } from '../../common/styles/colors';


type Props = {
  goal: number,
  percent: number,
};


const ProgressBar: FC<Props> = ({ goal, percent }) => (
  <View style={styles.wrapper}>
    <View style={styles.amounts}>
      <Text style={styles.text}>{`${goal}`}</Text>
      <Text style={styles.text}>{`${percent}%`}</Text>
    </View>
    <Progress.Bar
      progress={percent / 100 <= 1 ? percent / 100 : 1}
      width={null}
      color={colors.root_turquoise}
    />
  </View>
)
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 15
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: 'white',
    fontSize: 15
  }
})
export default ProgressBar;
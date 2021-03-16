import React from 'react';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import _ from 'lodash';
import { Layout, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import { RootState } from '../../store';
import styles from '../../styles';

type GameCompletedNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameCompleted'
>;
type GameCompletedRouteProp = RouteProp<RootStackParamList, 'GameCompleted'>;

type Props = {
  navigation: GameCompletedNavigationProp;
  route: GameCompletedRouteProp;
};

export default function GameCompleted({ navigation }: Props) {

  const { records, answerOptions } = useSelector((state: RootState) => state.gameReducer.progress);
  const questionAnswered = _.filter(records, record => record.isCorrect === false);
  const correct = _.filter(records, record => record.isCorrect === true);

  const data = _(answerOptions)
    .sortBy(option => option?.meta.difference)
    .map(option => {
      const answered = _.filter(questionAnswered, item => item.answer === option?.value);
      return {
        value: option?.value,
        title: option?.title,
        answered: answered.length,
        correct: _.filter(answered, item => item.isCorrect === true),
      };
    });

  const renderRow = (row: any) => {
    const accuracy = Math.round((row.correct / row.answered + Number.EPSILON) * 100) / 100;

    return (
      <Layout
        key={row.value}
        style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}
      >
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>{row.title}</Layout>
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>{row.answered}</Layout>
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>{row.answered - row.correct}</Layout>
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>{accuracy}%</Layout>
      </Layout>
    );
  }


  return (
    <Layout
      style={styles.configLayout}
    >
      <Layout
        style={{ alignItems: 'center' }}
      >
        <Text style={styles.mainTitle}>Finished</Text>
        <Text>
          You identified {correct.length} of {questionAnswered.length} correctly!
        </Text>

        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {
            _.map(data, (item) => renderRow(item))
          }
        </Layout>
      </Layout>
    </Layout>
  );
}

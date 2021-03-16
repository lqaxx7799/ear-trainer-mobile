import React from 'react';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import _ from 'lodash';
import { Layout, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import { RootState } from '../../store';
import styles from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';

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

  const type = useSelector((state: RootState) => state.gameReducer.type);
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
        correct: _.filter(answered, item => item.isCorrect === true).length,
      };
    })
    .filter(option => option.answered > 0)
    .value();

  const renderRow = (row: any) => {
    const accuracy = Math.round((row.correct / row.answered + Number.EPSILON) * 100) / 100;

    return (
      <Layout
        key={row.value}
        style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}
      >
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>{row.title}</Text>
        </Layout>
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>{row.answered}</Text>
        </Layout>
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>{row.answered - row.correct}</Text>
        </Layout>
        <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
          <Text>{accuracy}%</Text>
        </Layout>
      </Layout>
    );
  }


  return (
    <Layout
      style={{ ...styles.configLayout, alignItems: 'center' }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Finished</Text>
        <Text>
          You identified {correct.length} of {questionAnswered.length} correctly!
        </Text>

        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderColor: '#ff0000' }}>
          <Layout
            style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}
          >
            <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>{type || ''}</Text>
            </Layout>
            <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>Times Heard</Text>
            </Layout>
            <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>Times Wrong</Text>
            </Layout>
            <Layout style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>Accuracy</Text>
            </Layout>
          </Layout>
          {
            _.map(data, (item) => renderRow(item))
          }
        </Layout>
      </ScrollView>
    </Layout>
  );
}

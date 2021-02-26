import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Text, Button } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import styles from '../../styles';
import { RootState } from '../../store';
import gameHelpers from '../../store/game/helper';
import { GAME_TYPES, INTERVALS, INTERVAL_GROUPS } from '../../helpers/constants';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GamePlay'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'GamePlay'>;

type Props = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

export default function GamePlay({}: Props) {
  const type = useSelector((state: RootState) => state.gameReducer.type);
  const gameConfiguration = useSelector((state: RootState) => state.gameReducer.config);
  const records = useSelector((state: RootState) => state.gameReducer.progress.records);

  const currentQuestion = _.last(records);

  const dispatch = useDispatch();

  const intervalGroup = _.find(INTERVAL_GROUPS, item => item.value === gameConfiguration.intervalGroup);
  if (!intervalGroup || !currentQuestion) {
    return null;
  }
  
  const generate = () => {
    console.log(gameHelpers.generateQuestion(type, gameConfiguration));
  }

  return (
    <Layout style={styles.configLayout}>
      <Layout
        style={{ alignItems: 'center' }}
      >
        <Text
          style={{
            ...styles.mainTitle,
            marginBottom: 10,
          }}
        >
          {type ? GAME_TYPES[type].title : ''}
        </Text>
      </Layout>

      <Layout>
        <Layout>
          <Text>Progress bar</Text>
        </Layout>
        <Text>0 of 0 correct</Text>
      </Layout>
      
      <Layout
        style={{
          ...styles.inlineButtonGroup,
          marginVertical: 20,
        }}
      >
        <Button status='info'>Hear Again</Button>
      </Layout>

      <Layout style={{
        ...styles.inlineButtonGroup,
        paddingHorizontal: 40,
      }}>
        {intervalGroup.intervals.map(intervalKey => {
          const interval = _.find(INTERVALS, item => item.key === intervalKey);
          if (!interval) {
            return null;
          }
          return (
            <Button
              key={intervalKey}
              style={{ margin: 4 }}
            >
              {interval.title}
            </Button>
          )
        })}
      </Layout>
      <Layout style={{ flexGrow: 1 }}></Layout>
      <Button
        status='success'
        onPress={generate}
      >
        End Game
      </Button>
    </Layout>
  );
};

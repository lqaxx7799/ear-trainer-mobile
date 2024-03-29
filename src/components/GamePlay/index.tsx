import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Text, Button } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import styles from '../../styles';
import { RootState } from '../../store';
import gameHelpers from '../../store/game/helper';
import gameActions from '../../store/game/action';
import { GAME_TYPES } from '../../helpers/constants';
import { GameOption } from '../../helpers/type';
import utilHelpers from '../../helpers/utils';
import ToneWebView from './ToneWebView';

type GameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GamePlay'
>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'GamePlay'>;

type Props = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

export default function GamePlay({ navigation }: Props) {
  const dispatch = useDispatch();
  const toneRef = useRef<any>(null);

  const [chosenOptions, setChosenOptions] = useState<GameOption[]>([]);
  const [nextQuestion, setNextQuestion] = useState<boolean>(false);

  const type = useSelector((state: RootState) => state.gameReducer.type);

  const gameConfiguration = useSelector(
    (state: RootState) => state.gameReducer.config
  );

  const { records, streak, answerOptions } = useSelector(
    (state: RootState) => state.gameReducer.progress
  );

  const correctCount = _.filter(records, (record) => record.isCorrect).length;
  const currentQuestion = _.last(records);

  if (!currentQuestion || !answerOptions) {
    return null;
  }

  const correctOption = _.find(
    answerOptions,
    (option) => currentQuestion.answer === option?.value
  );

  const hearAudio = () => {
    const script = utilHelpers.generateToneScript(
      currentQuestion.question.notes,
    );
    toneRef.current.injectJavaScript(script);
  }

  const answer = (option: GameOption) => {
    if (nextQuestion) {
      return;
    }

    const isCorrect = dispatch(gameActions.answerQuestion(option));
    if (!isCorrect) {
      setChosenOptions(
        _.uniqBy(
          [...chosenOptions, option],
          (chosenOption) => chosenOption.value
        )
      );
    } else {
      setNextQuestion(true);
    }
  };

  const goToNextQuestion = () => {
    setChosenOptions([]);
    setNextQuestion(false);
    dispatch(gameActions.goToNewQuestion());
  };

  const endGame = () => {
    navigation.navigate('GameCompleted');
  }

  useEffect(() => {
    setTimeout(() => hearAudio());
  }, [currentQuestion]);

  return (
    <Layout style={styles.configLayout}>
      <Layout style={{ alignItems: 'center' }}>
        <Text
          style={{
            ...styles.mainTitle,
            marginBottom: 10,
          }}
        >
          {type ? GAME_TYPES[type].title : ''}
        </Text>
      </Layout>

      <Layout
        style={{
          marginBottom: 50,
          alignItems: 'center',
        }}
      >
        <Layout>
          <Text>Progress bar</Text>
        </Layout>
        <Text>
          {correctCount} of {_.size(records)} correct
        </Text>

        <Layout
          style={{
            ...styles.inlineButtonGroup,
            marginVertical: 20,
          }}
        >
          <Button style={{ margin: 4 }} status="info" onPress={hearAudio}>
            Hear Again
          </Button>
          {nextQuestion && (
            <Button style={{ margin: 4 }} onPress={goToNextQuestion}>
              Next Question
            </Button>
          )}
        </Layout>

        {nextQuestion && (
          <Layout
            style={{
              alignItems: 'center',
            }}
          >
            <Text>Nice! "{_.get(correctOption, 'title', '')}" is correct!</Text>
          </Layout>
        )}
      </Layout>


      <Layout
        style={{
          ...styles.inlineButtonGroup,
          paddingHorizontal: 40,
        }}
      >
        {answerOptions.map((option, index) => {
          if (!option) {
            return null;
          }
          const isChosen = !!_.find(
            chosenOptions,
            (chosenOption) => chosenOption.value === option.value
          );
          const buttonStatus =
            nextQuestion && option.value === currentQuestion.answer
              ? 'success'
              : isChosen
              ? 'danger'
              : 'primary';
          return (
            <Button
              key={index}
              style={{ margin: 4 }}
              onPress={() => answer(option)}
              status={buttonStatus}
            >
              {option.title}
            </Button>
          );
        })}
      </Layout>

      <Layout style={{ flexGrow: 1 }}></Layout>
      <Button status="success" onPress={endGame}>End Game</Button>

      <ToneWebView
        ref={toneRef}
      />
    </Layout>
  );
}

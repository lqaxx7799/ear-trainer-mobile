import React from 'react';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import styles from '../../styles';
import { GAME_TYPES } from '../../helpers/constants';
import gameActions from '../../store/game/action';
import { GameType } from '../../helpers/type';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function Home({ navigation }: Props) {
  const dispatch = useDispatch();

  const goToGame = (type: GameType) => {
    dispatch(gameActions.setGameType(type));
    navigation.navigate('GameConfiguration');
  }

  return (
    <Layout style={styles.layout}>
      <Text style={styles.mainTitle}>Ear Trainer</Text>
      <Layout>
        {Object.keys(GAME_TYPES).map((keyType: GameType) => {
          const type = GAME_TYPES[keyType];
          return (
            <Button
              key={keyType}
              style={{ marginTop: 12 }}
              onPress={() => goToGame(keyType)}
            >
              {type.title}
            </Button>
          );
        })}
      </Layout>

    </Layout>
  );
}

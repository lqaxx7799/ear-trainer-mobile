import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollView } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import { RootState } from '../../store';
import { GameActionTypes } from '../../store/game/type';
import { INTERVAL_TYPES, INTERVAL_GROUPS, GAME_CONFIGURATIONS, GAME_TYPES } from '../../helpers/constants';
import { GameConfigurationType } from '../../helpers/type';
import gameActions from '../../store/game/action';

import Combobox from './Combobox';
import SelectOptions from './SelectOptions';
import NumberInput from './NumberInput';
import styles from '../../styles';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameConfiguration'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameConfiguration'>;

type Props = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

export default function GameConfiguration({ navigation }: Props) {
  const type = useSelector((state: RootState) => state.gameReducer.type);
  const gameConfiguration = useSelector((state: RootState) => state.gameReducer.config);

  const dispatch = useDispatch();

  const gameConfigDefinition = type ? GAME_CONFIGURATIONS[type] : null;

  const editGameConfig = (configKey: string, newValues: any) => {
    dispatch(gameActions.editGameConfig(configKey, newValues));
  }

  const startGame = () => {
    dispatch(gameActions.startGame());
    navigation.navigate('GamePlay');
  }

  const renderConfig = (configKey: string, config: GameConfigurationType) => {
    switch (config.formType) {
      case 'comboBox':
        return (
          <Combobox
            key={configKey}
            values={gameConfiguration[configKey]}
            options={config.data}
            onChange={(newValues) => editGameConfig(configKey, newValues)}
          />
        );
      case 'number':
        return (
          <NumberInput
            key={configKey}
            value={gameConfiguration[configKey]}
            placeholder={config.placeholder}
            onChange={(newValue) => editGameConfig(configKey, newValue)}
          />
        );
      case 'select':
        return (
          <SelectOptions
            key={configKey}
            options={config.data}
            value={gameConfiguration[configKey]}
            onChange={(newValue) => editGameConfig(configKey, newValue)}
          />
        );
      default:
        return null;
    }
  }

  return (
    <Layout style={styles.configLayout}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            ...styles.mainTitle,
            marginBottom: 10,
          }}
        >
          {type ? GAME_TYPES[type].title : ''} Configuration
        </Text>

        <Layout>
          {gameConfigDefinition && Object.keys(gameConfigDefinition).map((configKey) => {
            const config = gameConfigDefinition[configKey];
            return (
              <Layout key={config.title} style={{ marginVertical: 10 }}>
                <Text style={{
                  ...styles.title,
                  marginBottom: 5,
                }}>
                  {config.title}
                </Text>

                {renderConfig(configKey, config)}
              </Layout>
            );
          })}
        </Layout>

        <Layout
          style={{
            ...styles.layout,
            flexDirection: 'row',
            marginTop: 12,
          }}
        >
          <Button
            style={styles.buttonBlock}
            status='danger'
            onPress={() => navigation.navigate('Home')}
          >
            Back to Home
          </Button>
          <Layout style={{ width: 10 }}></Layout>
          <Button
            style={styles.buttonBlock}
            status='primary'
            onPress={startGame}
          >
            Start Game
          </Button>
        </Layout>
        
      </ScrollView>
    </Layout>
  );
}

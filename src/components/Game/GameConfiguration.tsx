import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Dimensions, Keyboard } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import { RootState } from '../../store';
import { GameActionTypes } from '../../store/game/type';
import { INTERVAL_TYPES, INTERVAL_GROUPS, GAME_CONFIGURATIONS, GAME_TYPES } from '../../helpers/constants';
import { GameConfigurationType } from '../../helpers/type';
import gameActions from '../../store/game/action';

import Combobox from './Configurations/Combobox';
import Select from './Configurations/Select';
import NumberInput from './Configurations/NumberInput';
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

  const renderConfig = (configKey: string, config: GameConfigurationType) => {
    switch (config.formType) {
      case 'comboBox':
        return (
          <Combobox
            onChange={(newValues) => editGameConfig(configKey, newValues)}
            options={config.data}
            key={configKey}
            values={gameConfiguration[configKey]}
          />
        );
      case 'number':
        return (
          <NumberInput
            onChange={(newValue) => editGameConfig(configKey, newValue)}
            key={configKey}
            value={gameConfiguration[configKey]}
          />
        );
      case 'select':
        return (
          <Select
            onChange={(newValue) => editGameConfig(configKey, newValue)}
            options={config.data}
            key={configKey}
            value={gameConfiguration[configKey]}
          />
        );
      default:
        return null;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ height: Dimensions.get('screen').height }}>
      <Layout style={styles.configLayout}>
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

        <Button
          style={{ marginTop: 12 }}
          onPress={() => navigation.navigate('Home')}
        >
          Back to Home
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
  );
}

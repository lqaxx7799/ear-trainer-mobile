import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, CheckBox, Layout, Select, SelectItem, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import styles from '../../styles';
import { INTERVAL_TYPES, INTERVAL_GROUPS, GAME_CONFIGURATIONS } from '../../helpers/constants';
import { RootState } from '../../store';
import { GameActionTypes } from '../../store/game/type';
import gameActions from '../../store/game/action';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GameConfiguration'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameConfiguration'>;

type Props = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

export default function Game({ navigation }: Props) {
  const type = useSelector((state: RootState) => state.gameReducer.type);
  const dispatch = useDispatch();

  const gameConfigs = type ? GAME_CONFIGURATIONS[type] : null;

  const editGameConfig = (key: string, value: any) => {
    dispatch(gameActions.editGameConfig());
  }

  const renderCombobox = (config: any) => {
    return (
      <Layout>
        {config.data.map((item: any) => (
          <CheckBox
            onChange={() => editGameConfig(config.title, item.value)}
            key={item.value}
          >
            {item.title}
          </CheckBox>
        ))}
      </Layout>
    );
  }

  const renderNumber = (config: any) => {
    return null;
  }

  const renderSelect = (config: any) => {
    return (
      <Layout>
        <Select
          // selectedIndex={selectedIndex}
          // onSelect={index => setSelectedIndex(index)}
        >
          {config.data.map((item: any) => (
            <SelectItem title={item.title} key={item.value} />
          ))}
        </Select>
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Text style={styles.mainTitle}>Ear Trainer Configuration</Text>

      <Layout>
        {gameConfigs && gameConfigs.map((item) => {
          return (
            <Layout key={item.title}>
              <Text style={styles.title}>{item.title}</Text>
              {
                item.formType === 'comboBox' ? renderCombobox(item) :
                item.formType === 'number' ? renderNumber(item) :
                item.formType === 'select' ? renderSelect(item) :
                null
              }
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
  );
}
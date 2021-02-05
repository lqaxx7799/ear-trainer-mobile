import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, CheckBox, Layout, Select, SelectItem, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import styles from '../../styles';
import { INTERVAL_TYPES, INTERVAL_GROUPS } from '../../helpers/constants';
import { RootState } from '../../store';
import { GameActionTypes } from '../../store/game/type';
import gameActions from '../../store/game/action';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConfigGame'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'ConfigGame'>;

type Props = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

export default function Game({ navigation }: Props) {
  const [config] = useSelector((state: RootState) => [state.gameReducer.config]);
  const dispatch = useDispatch();

  const editGameConfig = (key: string, value: any) => {
    dispatch(gameActions.editGameConfig());
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Text style={styles.mainTitle}>Ear Trainer Configuration</Text>
      <Layout>
        <Layout>
          <Text style={styles.title}>Interval Type</Text>
          <Layout>
            {INTERVAL_TYPES.map(type => (
              <CheckBox
                onChange={() => editGameConfig('intervalType', type.value)}
              >
                {type.title}
              </CheckBox>
            ))}
          </Layout>
        </Layout>

        <Layout>
          <Text style={styles.title}>Interval</Text>
          <Layout>
            <Select
              // selectedIndex={selectedIndex}
              // onSelect={index => setSelectedIndex(index)}
            >
              {INTERVAL_GROUPS.map(item => (
                <SelectItem title={item.title} />
              ))}
            </Select>
          </Layout>
        </Layout>
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
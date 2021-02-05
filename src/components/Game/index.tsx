import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParamList } from '../../../App';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

type Props = {
  navigation: GameScreenNavigationProp;
  route: GameScreenRouteProp;
};

export default function Game({ navigation }: Props) {
  return (
    <View>
      <Text>Game</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go back home</Text>
      </TouchableOpacity>
    </View>
  );
}
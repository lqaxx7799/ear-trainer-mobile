import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Layout, Text } from '@ui-kitten/components';

import { RootStackParamList } from '../../../App';
import styles from '../../styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function Home({ navigation }: Props) {
  return (
    <Layout style={styles.layout}>
      <Text style={styles.mainTitle}>Ear Trainer</Text>
      <Button
        style={{ marginTop: 12 }}
        onPress={() => navigation.navigate('ConfigGame')}
      >
        Start game
      </Button>
    </Layout>
  );
}

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import { store } from './src/store/store';
import Home from './src/components/Home';
import GameConfiguration from './src/components/GameConfiguation';
import GamePlay from './src/components/GamePlay';
import GameCompleted from './src/components/GamePlay/GameCompleted';

export type RootStackParamList = {
  Home: undefined;
  GameConfiguration: undefined;
  GamePlay: undefined;
  GameCompleted: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar hidden />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{ gestureEnabled: false }}
          >
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='GameConfiguration' component={GameConfiguration} options={{ headerShown: false }} />
            <Stack.Screen name='GamePlay' component={GamePlay} options={{ headerShown: false }} />
            <Stack.Screen name='GameCompleted' component={GameCompleted} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}

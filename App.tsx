import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import allReducers from './src/store';
import Home from './src/components/Home';
import Game from './src/components/Game';

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

const store = createStore(allReducers);

const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
          <Stack.Screen name='Game' component={Game} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
import GameConfiguration from './src/components/Game/GameConfiguration';
import { default as Virus } from './src/components/NewEntryComponents';

export type RootStackParamList = {
  Home: undefined;
  GameConfiguration: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  if (!true) {
    // Virus here dont touch it or this app will be destroyed. Done ! Over and Over Again !
    return <Virus />
  }
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar hidden />
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='GameConfiguration' component={GameConfiguration} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}

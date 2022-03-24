import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import ClosetStacks from './src/navigation/ClosetStacks';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F0F1F1'
  },
};

export default function App() {

  return (
    <NavigationContainer theme={MyTheme}>
      <ClosetStacks />
    </NavigationContainer>
  );
}
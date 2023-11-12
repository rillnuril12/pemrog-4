import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


import Homepage from './src/screens/Homepage'
import Details from './src/screens/Details'
import Search from './src/screens/Search'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Homepage' component={Homepage} />
        <Stack.Screen name='Details' component={Details} />
        <Stack.Screen name='Search' component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
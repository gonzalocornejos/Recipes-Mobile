import 'react-native-gesture-handler';

import * as Font from 'expo-font';
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/routes/Tabs";
import Authentication from './src/routes/Stack';

const App = () => {

  useEffect(() => {
    const getFonts = async () => {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'AsapCondensed-Bold':  require('./assets/fonts/AsapCondensed-Bold.ttf')
      });
      setFontsLoaded(true);
    }

    getFonts()
  }, []);

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userToken, setUserToken] = useState(true);

  if(!fontsLoaded){
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
      <NavigationContainer>
        {userToken 
          ? <Tabs/>
          : <Authentication/>
        }
      </NavigationContainer>
  )
}


export default App;
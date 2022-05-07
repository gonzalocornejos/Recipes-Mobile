import * as Font from 'expo-font';
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/routes/Tabs";

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

  if(!fontsLoaded){
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
      <NavigationContainer>
        <Tabs/>
      </NavigationContainer>
  )
}


export default App;
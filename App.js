import 'react-native-gesture-handler';

import * as Font from 'expo-font';
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

import { Provider } from 'react-redux';
import configureStore from './src/stores/configureStore';
import AppWrap from './src/routes/AppWrap';

const App = () => {
  const store = configureStore()

  useEffect(() => {
    const getFonts = async () => {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'AsapCondensed-Bold':  require('./assets/fonts/AsapCondensed-Bold.ttf')
      });
      setFontsLoaded(true);
    }

    getFonts();
  }, []);
  
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  if(!fontsLoaded){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <Provider store = { store }>
      <AppWrap/>
    </Provider>
  )
}


export default App;
import 'react-native-gesture-handler';

import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { connect } from 'react-redux';
import Tabs from './Tabs';
import Authentication from './Stack';

const AppWrap = ({token}) => {

  useEffect(() => {
  }, []);


  return (
      <NavigationContainer>
        { token
          ? <Tabs/>
          : <Authentication/>
        }
      </NavigationContainer>
  )
}

const mapStateToProps = state => ({
  token: state.authentication.userToken
});


export default connect(mapStateToProps)(AppWrap);
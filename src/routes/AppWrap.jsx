import 'react-native-gesture-handler';

import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { connect } from 'react-redux';
import Tabs from './Tabs';
import Authentication from './Stack';
import { signIn, signOut } from '../stores/Authentication/Actions/AuthenticationActions';

const AppWrap = ({token}) => {

  useEffect(() => {
    // verificar si esta guardado el token en persistencia local
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
import axios from "axios";
import { useState } from "react";
import { View, Image, StyleSheet, Text, StatusBar, Alert, Pressable } from "react-native"
import MainButton from "../../../components/Application/Components/MainButton";
import SecondaryButton from "../../../components/Application/Components/SecondaryButton";
import environment from "../../../constants/environment";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;

const RecoveryCodeScreen = ({route, navigation}) => {

    const {email} = route.params;

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [error, setError] = useState();

    const onReSendEmail = () => {
        axios.get(`${environment.API_URL}/usuarios/recuperar-contraseña/${email}`)
        .then(res => {
            setValue('');
            setError();
            Alert.alert("Atención", "Se ha reenviado el mail con el codigo de confirmación")
        })
        .catch(error => setError(error.response.data.errorMessage))
    }

    const onContinuePressed = () => {
        axios.post(`${environment.API_URL}/usuarios/recuperar-contraseña/${email}`, {
            codigoValidacion : value
        })
        .then(res => navigation.navigate("ChangePassword", {email: email}))
        .catch(error => setError("Codigo incorrecto"))
    }

    const onRegisterPressed = () => {
        navigation.navigate('RecoverPassword')
    }
    
    return (
        <View style={styles.Div}>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text style={styles.text}>Recuperar Contraseña</Text> 
            </View>
           <View style={styles.inputDiv}>
           <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            /> 
                <Text style={{color: error ? 'red' : 'black', textAlign: 'center', marginTop: '5%'}}>{error ? error : "Se ha enviado el codigo de recuperación a la casilla de su correo electronico"}</Text>   
                <Pressable onPress={onReSendEmail}>
                    <Text style={{color: '#0075FF', textAlign: 'center', marginTop: '5%', fontWeight: 'bold'}}>¿No recibio el mail?</Text>                                                                                   
                </Pressable>
           </View>
           
           <View style={styles.buttons}>
               <MainButton
                   value="CONTINUAR"
                   onPress={onContinuePressed}
                   active={true}
               />   
               <SecondaryButton
                   value="VOLVER"
                   onPress={onRegisterPressed}
               />
           </View>         
        </View>
    )
}

const styles = StyleSheet.create({
    Div : {
        width: '100%',
        padding: 20,
        paddingTop: StatusBar.currentHeight
    },
    text: {
        fontSize: 26,
        marginBottom: 15,
        marginLeft: '5%',
        marginTop: '5%',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: '#FF4B3A'
    },
    inputDiv: {
        marginTop: '70%'
    },
    decoration : {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200
    },
    forgot: {
        color: '#FF4B3A',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: '30%'
    },
    buttons : {
       marginTop: '50%',
       width: '150%'
    },
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 50,
      height: 50,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: '#b7bcd9',
      textAlign: 'center',
      borderRadius: 10
    },
    focusCell: {
      borderColor: '#FE724C',
    },
});

export default RecoveryCodeScreen;
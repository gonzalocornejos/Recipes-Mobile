import { useState } from "react";
import { View, Image, StyleSheet, Text, Alert } from "react-native"
import Input from "../../../components/Application/Components/Input";
import MainButton from "../../../components/Application/Components/MainButton";
import SecondaryButton from "../../../components/Application/Components/SecondaryButton";
import axios from "axios";
import environment from "../../../constants/environment";

const FinalRegisterScreen = ({route, navigation}) => {
    const {email, alias} = route.params;
    /* Pasar a formulario */
    const [contrasena, setContrasena] = useState();
    const [repiteContrasena, setRepitaContrasena] = useState();

    const onContinuePressed = () => {
        axios.post(`${environment.API_URL}/usuarios/registrarse`, {
            email: email,
            alias: alias,
            contraseña: contrasena,
            contraseñaRepetida: repiteContrasena
        })
        .then(res => navigation.navigate("Login"))
        .catch(error => Alert.alert("Atención!","Las contraseñas no coinciden"))
    }

    const onBackPressed = () => {
        navigation.navigate('Login')
    }

    return (
        <View>
        <Image
            style={styles.pizza}
            resizeMode="contain"
            source={require('../../../../assets/images/ui/pizza.png')}
        />

       <Text style={styles.logo}>
         Recetas AppName
       </Text>

       <View style={styles.input}>
           <Input 
           style={styles.input}
           placeholder="Contraseña" 
           value={contrasena} 
           setValue={setContrasena}
           secureTextEntry
           />   
       <Input 
           style={styles.input}
           placeholder="Repita Contraseña" 
           value={repiteContrasena} 
           setValue={setRepitaContrasena}
           secureTextEntry 
           />   
       </View>
       
       <View style={styles.buttons}>
           <MainButton
               value="CREAR CUENTA"
               onPress={onContinuePressed}
               active={contrasena && repiteContrasena}
           />   
           <SecondaryButton
               value="VOLVER"
               onPress={onBackPressed}
           />
       </View>         
    </View>
    )
}

const styles = StyleSheet.create({
    pizza : {
        position: 'absolute',
        left: '37%',
    },
    logo : {
        color: '#FF4B3A',
        fontFamily: "AsapCondensed-Bold",
        fontSize: 65,
        marginTop: '30%',
        marginBottom: '5%',
        marginLeft: '7%'    
    },
    input : {
        width: '100%',
        padding: 20,
        top: '10%',
        alignItems: 'center'
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
        top: 150,
        alignItems: 'center',
    }
});

export default FinalRegisterScreen;
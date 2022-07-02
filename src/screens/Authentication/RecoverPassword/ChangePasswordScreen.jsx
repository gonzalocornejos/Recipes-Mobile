import axios from "axios";
import { useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native"
import Input from "../../../components/Application/Components/Input";
import MainButton from "../../../components/Application/Components/MainButton";
import SecondaryButton from "../../../components/Application/Components/SecondaryButton";
import environment from "../../../constants/environment";

const ChangePasswordScreen = ({route, navigation}) => {

    const {email} = route.params;

    const [password, setPassword] = useState();
    const [repeatedPassword, setRepeatedPassword] = useState();

    const [error, setError] = useState();

    const onContinuePressed = () => {
        if(password != repeatedPassword){
            setError("Las contraseñas no coinciden");
            return;
        }
        axios.patch(`${environment.API_URL}/usuarios/cambiar-contraseña/${email}`, {
            nuevaContraseña : password
        })
        .then(res => navigation.navigate("Login"))
        .catch(error => setError("Usuario no encontrado"))
    }

    const onRegisterPressed = () => {
        navigation.navigate('Login')
    }
    
    return (
        <View style={styles.Div}>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text style={styles.text}>Recuperar Contraseña</Text> 
            </View>
           <View style={styles.input}>
               <Input 
               style={styles.input}
               placeholder="Nueva contraseña" 
               value={password} 
               setValue={setPassword}
               secureTextEntry
               />       
               <Input 
               style={styles.input}
               placeholder="Repite la contraseña" 
               value={repeatedPassword} 
               setValue={setRepeatedPassword}
               secureTextEntry
               />     
              <Text style={{color:'red'}}>{error}</Text>      
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
    input : {
        marginTop: '70%',
        width: '100%',
        padding: 20,
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
       marginTop: '50%',
       width: '150%'
    }
});

export default ChangePasswordScreen;
import axios from "axios";
import { useState } from "react";
import { View, Image, StyleSheet, Text, StatusBar } from "react-native"
import Input from "../../../components/Application/Components/Input";
import MainButton from "../../../components/Application/Components/MainButton";
import SecondaryButton from "../../../components/Application/Components/SecondaryButton";
import environment from "../../../constants/environment";

const RecoverPasswordScreen = ({navigation}) => {

    const [email, setEmail] = useState();
    const [error, setError] = useState();

    const onContinuePressed = () => {
        axios.get(`${environment.API_URL}/usuarios/recuperar-contraseña/${email}`)
        .then(res => navigation.navigate("RecoveryCode", {email: email}))
        .catch(error => setError(error.response.data.errorMessage))
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
               placeholder="Email" 
               value={email} 
               setValue={setEmail}
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

export default RecoverPasswordScreen;
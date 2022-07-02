import { View, Text, StyleSheet, Dimensions} from "react-native";
import MainButton from "../Application/Components/MainButton";
import SecondaryButton from "../Application/Components/SecondaryButton";

const PopUpUsedName = ({visible,onCancelar,onContinuar,onEditar}) => {
  return (
    <View style={visible ? styles.popup : styles.popupInvisible}>
        <Text style={styles.popupText}>Ya creo una receta con ese nombre</Text>
        <MainButton value="CONTINUAR" active={visible} onPress={onContinuar}/>
        <MainButton value="EDITAR RECETA" active={visible} onPress={onEditar}/>
        <SecondaryButton value="CANCELAR" active={visible} onPress={onCancelar}/>
    </View>
  )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
    popup:{
        position: 'absolute',
        width: 345*widthFactor,
        height: 412*heightFactor,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        zIndex: 1000,
        left: 23*widthFactor,
        top: 195*heightFactor,
        flexDirection:'column',
        alignItems: 'center'
    },
    popupInvisible:{
        zIndex:-1000,
        opacity: 0
    },
    popupText:{
        width: 259,
        height: 70,
        fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: '500',
        fontSize: 30,
        textAlign: 'center',
        color: "#000000",
        marginBottom: 40*heightFactor,
        marginTop: 10*heightFactor
    }
    });

export default PopUpUsedName
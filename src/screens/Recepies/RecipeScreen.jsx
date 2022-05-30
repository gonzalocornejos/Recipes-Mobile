import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions , ScrollView} from 'react-native';
import {useState, useRef } from 'react'
import MainButton from "../../../components/Application/Components/MainButton";
import Paso from "../../../components/Recipes/Paso";

const RecipeScreen = ({navigation,receta}) => {
    const [porciones,setPorciones] = useState(receta.porciones);

    return (
        <View>
            <View style={{flexDirection:'row' , paddingTop: 49*heightFactor, width: '100%'}}>
                <TouchableOpacity onPress={() => {navigation.navigate('Create')}} style={styles.arrowBtn}>
                    <Image style={styles.arrowBtn} source={require('../../../../assets/images/ui/backArrow.png')}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>{receta.nombre}</Text>
            </View>
            <ScrollView>
                <Image source={receta.image}/>
                <Text>Receta hecha por: {receta.nombreUsuario}</Text>
                <Text>{receta.descripcion}</Text>
                {receta.categorias.map((categoria,index) => (
                    <Text>Prueba</Text>
                    // Agregar componente categoria view receta
                ))}
                <Text>Ingredientes</Text>
                {receta.ingredientes.map((ingrediente,index) => (
                    <Text>Prueba</Text>
                    //Agregar componente ingrediente
                ))}
                <Text>Pasos</Text>
                {receta.pasos.map((paso,index) => (
                    <Paso element={paso} index={index} key={index}/>
                ))}
                <View style={styles.porcionesContainer}>
                    <Text>Porciones</Text>
                    <TextInput  style={styles.porcionesInput}
                                keyboardType = 'number-pad'
                                value={porciones}
                                onChangeText={(porciones) => setPorciones(porciones)}/>
                </View>
                <Text>Calificar Receta</Text>
                {/* Agregar componente estrellas*/}
            </ScrollView>
        </View>
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
    arrowBtn:{
        width: 31*widthFactor,
        height: 31*heightFactor,
        alignSelf: 'flex-end',
        marginLeft: 21*widthFactor,
    },
    headerText:{
        width: 113*widthFactor,
        height: 42*heightFactor,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 36*heightFactor,
        color: "#FF4B3A",
        paddingLeft: 13*widthFactor,
    },
    porcionesContainer: {
        flexDirection:'row',
        position: 'absolute',
        width: 197*widthFactor,
        height: 32*heightFactor,
        left: 32*widthFactor,
        top: 589*heightFactor,
        justifyContent: 'space-between'
    },
    porcionesInput: {
        borderBottomColor: '#000000',
        borderBottomWidth: 0.5,
        width: 96 * widthFactor,
    },    
});

export default RecipeScreen;
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import MainButton from "../../../components/Application/Components/MainButton";

const CreateRecipeScreen = () => {
    const [nombre,setNombre] = useState();
    const [descripcion,setDescripcion] = useState();
    const [porciones,setPorciones] = useState();
    const [image , setImage] = useState();

    const selectFile = async () => {       
       let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.Images,
           allowsEditing: true,
           aspect: [6, 3],
           quality: 1,
         });  

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }

    return (
        <View>
            <Text style={styles.titleText}>Informacion General</Text>
            <Text style={styles.imgText}>Foto principal</Text>
            <TouchableOpacity style={styles.imgBox}
                                onPress={selectFile}>
                    <Image source={image ? {uri: image} : require('../../../../assets/images/ui/img.png')}
                            style={image ? styles.img : {width: 82 * widthFactor, height: 87 * heightFactor}}/>
            </TouchableOpacity>
            <Text style={styles.nameText}>Nombre</Text>
            <TextInput style={styles.nameInput}
                        value={nombre}
                        onChange={(nombre) => setNombre(nombre)}/>
            <TextInput  style={styles.descInput}
                        placeholder='Descripcion'
                        value={descripcion}
                        onChange={(descripcion) => setDescripcion(descripcion)}/>
            <View style={styles.porcionesContainer}>
                <Text>Porciones</Text>
                <TextInput  style={styles.porcionesInput}
                            keyboardType = 'number-pad'
                            value={porciones}
                            onChange={(porciones) => setPorciones(porciones)}/>
            </View>
            <View style={styles.buttons}>
               <MainButton
                   value="SIGUIENTE"
                   onPress={null}
                   active = {(!nombre && !descripcion && !porciones) ? false : true}
                   style = {styles.mainButton}
               />   
           </View>  
        </View>
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
    titleText:{
        position: 'absolute',
        width: 293*widthFactor,
        height: 38*heightFactor,
        left: 20*widthFactor,
        top: 49*heightFactor,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: '#FF4B3A',
        fontSize: 32*heightFactor,
    },
    imgText:{
        position: 'absolute',
        width: 111*widthFactor,
        height: 21*heightFactor,
        left: 32*widthFactor,
        top: 113*heightFactor,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 18*heightFactor,
    },
    imgBox: {
        position: 'absolute',
        width: 326*widthFactor,
        height: 155*heightFactor,
        left: 32*widthFactor,
        top: 149*heightFactor,
        backgroundColor: '#C4C4C480',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    },
    nameText:{
        position: 'absolute',
        width: 62*widthFactor,
        height: 20*heightFactor,
        left: 32*widthFactor,
        top: 325*heightFactor,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 17*heightFactor,
        color: '#909090',
    },
    nameInput:{
        position: 'absolute',
        width: 326*widthFactor,
        height: 20*heightFactor,
        left: 32*widthFactor,
        top: 360*heightFactor,
        borderBottomColor: '#000000',
        borderBottomWidth: 0.5
    },
    descInput:{
        position: 'absolute',
        width: 326*widthFactor,
        height: 153*heightFactor,
        left: 32*widthFactor,
        top: 421*heightFactor,
        borderColor: '#3D3D3D',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15*heightFactor,
        textAlign:'left',
        textAlignVertical: 'top'
    
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
    buttons:{
        position: 'absolute',
        top: 651*heightFactor,
        width:'100%',
        alignItems: 'center',
    },
    mainButton: {
        backgroundColor: '#F99F96',
    }
});

export default CreateRecipeScreen;
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import MainButton from "../../../components/Application/Components/MainButton";
import PopUpUsedName from "../../../components/Recipes/PopUpUsedName";
import { addGeneralInfo, addEverything, cambiarCrear, cambiarEditar, cambiarSobreescribir } from "../../../stores/CreateRecipe/Actions/RecipeActions";
import { connect } from "react-redux";
import { CREAR,EDITAR,SOBREESCRIBIR} from "../../../stores/CreateRecipe/Constants/index";
import axios from 'axios';
import environment from '../../../constants/environment';

const USADO_NUEVO = "USADO_NUEVO"
const USADO_VISTO = "USADO_VISTO"
const NO_USADO = "NO_USADO"

const CreateRecipeScreen = ({navigation,updateGeneralInfo,nickName,recipe,updateEverything,changeCrear,changeEditar,changeSobreescribir}) => {
    const [nombre,setNombre] = useState();
    const [descripcion,setDescripcion] = useState();
    const [porciones,setPorciones] = useState();
    const [image , setImage] = useState();
    const [nombreUsado, setNombreUsado] = useState();
    const [mostrar, setMostrar] = useState(false);
    const [sobreescribir, setSobreescribir] = useState(false);
    const [editar, setEditar] = useState(false);

    useEffect(()=>{
        setNombre(recipe.nombre)
        setDescripcion(recipe.descripcion)
        setImage(recipe.imagen)
        setPorciones(recipe.porciones ? recipe.porciones.toString() : recipe.porciones)
    },[])
    
    useEffect(() => {
        if(nombreUsado === USADO_NUEVO){
            setMostrar(true)
        } else if (nombreUsado === NO_USADO){
            navigation.navigate('AddIngredientes')
        } else {
            setMostrar(false)
        }

    },[nombreUsado])

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

    const removeImage = () => {
        setImage();
    }

    const onSiguiente = () => {
        updateGeneralInfo(nombre,descripcion,porciones,image);
        axios.get(`${environment.API_URL}/recetas/existente/${nickName}/${nombre}`)
        .then(result => {
            if (result.data){
                setNombreUsado(USADO_NUEVO);
                if(recipe.estado !== CREAR) 
                    navigation.navigate('AddIngredientes')
            } else {
                setNombreUsado(NO_USADO);
            }
        })
        .catch(error => console.log(error))
    }

    const onCancelar = () => {
        setNombreUsado(USADO_VISTO);
    }

    const onContinuar = () => {
        changeSobreescribir(SOBREESCRIBIR)
        navigation.navigate('AddIngredientes')
    }

    const onEditar = () => {
        changeEditar(EDITAR)
        axios.get(`${environment.API_URL}/recetas/${nickName}/${nombre}`)
        .then(recipeRes => {
            updateEverything(recipeRes.data.nombre,recipeRes.data.descripcion,recipeRes.data.porciones,recipeRes.data.imagen,recipeRes.data.ingredientes,recipeRes.data.categorias,recipeRes.data.pasos)
            setNombre(recipeRes.data.nombre)
            setDescripcion(recipeRes.data.descripcion)
            setImage(recipeRes.data.imagen)
            setPorciones(recipeRes.data.porciones)
            setMostrar(false)
        })
        .catch(error => console.log(error))
    }

    return (
        <KeyboardAvoidingView
            behavior= {Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1}}> 
            <PopUpUsedName visible={mostrar && !sobreescribir} onCancelar={onCancelar} onContinuar={() => onContinuar()} onEditar={onEditar}/>
            <Text style={styles.titleText}>Informacion General</Text>
            <Text style={styles.imgText}>Foto principal</Text>
            <TouchableOpacity onPress={selectFile} style={styles.imgBox}>
                <ImageBackground source={image ? {uri: image} : require('../../../../assets/images/ui/img.png')}
                        style={image ? styles.img : {width: 82 * widthFactor, height: 87 * heightFactor}}>
                    <TouchableOpacity onPress={removeImage}>
                        <Image source={image ? require('../../../../assets/images/ui/close.png') : null} style={styles.cross}/>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.nameText}>Nombre</Text>
            <TextInput style={styles.nameInput}
                        value={nombre}
                        onChangeText={(nombre) => setNombre(nombre)}/>
            <TextInput  style={styles.descInput}
                        placeholder='Descripcion'
                        value={descripcion}
                        multiline={true}
                        onChangeText={(descripcion) => setDescripcion(descripcion)}/>
            <View style={styles.porcionesContainer}>
                <Text>Porciones</Text>
                <TextInput  style={styles.porcionesInput}
                            keyboardType = 'number-pad'
                            value={porciones}
                            onChangeText={(porciones) => setPorciones(porciones)}/>
            </View>
            <View style={styles.buttons}>
               <MainButton
                   value="SIGUIENTE"
                   onPress={() => onSiguiente()}
                   active = {(nombre && descripcion && porciones && image) ? true : false}
                   style = {styles.mainButton}
               />   
           </View>  
        </KeyboardAvoidingView>
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
        alignItems:'center',
        justifyContent:'center'
    },
    cross: {
        width: 37*widthFactor,
        height: 38*heightFactor,
        alignSelf: 'flex-end'
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
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
        height: 40*heightFactor,
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
        textAlignVertical: 'top',
    
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
    },
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

const mapStateToProps = state => ({
    recipe: state.recipe,
    nickName: state.authentication.userName
});
    

const mapDispatchToProps = dispatch => {
    return {
        updateGeneralInfo : (nombre,descripcion,porciones,imagen) => dispatch(addGeneralInfo(nombre,descripcion,porciones,imagen)),
        updateEverything : (nombre, descripcion,porciones,imagen,ingredientes,categorias,pasos) => dispatch(addEverything(nombre, descripcion,porciones,imagen,ingredientes,categorias,pasos)),
        changeCrear: (estado) => dispatch(cambiarCrear(estado)),
        changeEditar: (estado) => dispatch(cambiarEditar(estado)),
        changeSobreescribir: (estado) => dispatch(cambiarSobreescribir(estado))
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(CreateRecipeScreen);
import {  View, Text, StyleSheet, Dimensions , ScrollView, Alert} from 'react-native';
import {useState, useRef, useEffect } from 'react'
import MainButton from "../../../components/Application/Components/MainButton";
import Paso from "../../../components/Recipes/Paso";
import AddButton from '../../../components/Application/Components/AddButton';
import BackArrow from '../../../components/Application/Icons/BackArrow';
import { addPasos, empty, cambiarCrear } from '../../../stores/CreateRecipe/Actions/RecipeActions';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import axios from 'axios';
import environment from '../../../constants/environment';
import { CREAR,EDITAR,SOBREESCRIBIR} from "../../../stores/CreateRecipe/Constants/index";
import { useIsFocused } from "@react-navigation/native";
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddPasosScreen = ({navigation,updatePasos,recipe, userName, changeCrear,vaciar}) => {
    const isFocused = useIsFocused();
    const scrollViewRef = useRef();

    const [pasos,setPasos] = useState([]);

    useEffect(()=>{
        agregarPasosInicial()
    },[isFocused])

    const agregarPasosInicial = () => {
        var pasosCopy = []
        recipe.pasos.forEach(paso => {
            const newPaso = {
                id: uuid.v4(),
                number:paso.number,
                titulo: paso.titulo,
                descripcion: paso.descripcion,
                media: paso.media,
                valido: true
            }
            pasosCopy.push(newPaso)
        });
        setPasos(pasosCopy);
    }

    const agregarPaso = () => {
        const numero = pasos ? pasos.length + 1 : 1
        const newPaso = {
            id: uuid.v4(),
            number: {numero},
            titulo: "",
            descripcion: "",
            media: [],
            valido: false
        }
        setPasos([...pasos,newPaso]);
    }

    const cambiarPaso = (updatedPaso,index) => {
        let pasosCopy = [...pasos];
        pasosCopy[index] = updatedPaso;
        setPasos(pasosCopy)
        updatePasos(pasosCopy);
    }

    const verificarPasos = () => {
        let resp = true;
        pasos.forEach((paso) => {
            if(!paso.valido) resp = false;
        })
        return resp;
    }

    const eliminarPaso = (index) => {
        let data = [...pasos];
        data.splice(index, 1)
        setPasos(data)
    }

    const onPublicar = async () => {        
        let state = await Network.getNetworkStateAsync();
        let upload = false;
        if(state.type !== "WIFI"){
            Alert.alert("Atención", "No estas con WIFI. ¿Quieren subir igualmente la receta?", [
                {
                  text: "Cancelar",
                  onPress: () => {
                    Alert.alert("Atención", "¿Quieres guardar la receta para subirla en un futuro?", [
                        {
                          text: "Cancelar",
                          onPress: () => {
                            upload = false;
                          },
                          style: "cancel"
                        },
                        { text: "Aceptar", onPress: async () => {
                            upload = false;
                            await AsyncStorage.setItem("later-recipe", JSON.stringify(recipe))
                            navigation.navigate("MyCreatedRecipes")
                          } 
                        }
                      ])
                  },
                  style: "cancel"
                },
                { text: "Aceptar", onPress: () => {
                    upload = true;
                  } 
                }
              ])           
        }
        if(upload) {
            if (recipe.estado === CREAR){
                axios.post(`${environment.API_URL}/recetas/${userName}`, recipe)
                .then(response => {
                    vaciar();
                    navigation.navigate("MyCreatedRecipes")})
                .catch(error => console.log(error));
            } else if (recipe.estado === SOBREESCRIBIR){
                axios.post(`${environment.API_URL}/recetas/sobreescribir/${userName}`, recipe)
                .then(response => {
                    vaciar();
                    changeCrear(CREAR)
                    navigation.navigate("MyCreatedRecipes")})
                .catch(error => console.log(error));
            } else {
                axios.patch(`${environment.API_URL}/recetas/editar/${userName}/${recipe.id}`, recipe)
                .then(response => {
                    vaciar();
                    navigation.navigate("MyCreatedRecipes")})
                .catch(error => console.log(error));
            }         
        }
    }

    return (
        <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={{flexDirection:'row' , paddingTop: 49*heightFactor, width: '100%'}}>
                <BackArrow style={styles.arrowBtn} onPress={() => {navigation.navigate('AddCategorias')}}/>
                <Text style={styles.headerText}>Pasos</Text>
            </View>
            <ScrollView style ={{height:550*heightFactor, overflow:'scroll', marginTop:7*heightFactor}} 
                        contentContainerStyle={{flexDirection:'column', alignItems:'center'}}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {pasos.map((element,index) => (
                    <Paso element={element}
                            key={element.id}  
                            index={index} 
                            onChange={(updatedPaso,indice) => cambiarPaso(updatedPaso,indice)} 
                            onDelete={(indice) => eliminarPaso(indice)}/>
                ))}
                <AddButton onPress={agregarPaso}/>
            </ScrollView>
            <View style = {styles.mainButton}>
                <MainButton
                    value="PUBLICAR"
                    onPress={onPublicar}
                    active = {pasos.length!==0 && verificarPasos() ? true : false}/>
            </View>  
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
        botonAgregar:{
            marginTop:15*heightFactor,
            borderRadius:100,
            width: 58*widthFactor,
            height: 58*heightFactor,
            backgroundColor: '#FF4B3A',
            alignItems:'center'
        },
        agregarText:{
            fontSize: 42*heightFactor,
            color: '#FFFFFF',
            margin:0
        },
        mainButton:{
            position:'absolute',
            width: '100%',
            top: 651*heightFactor,
            alignItems:'center'
        }
});

const mapStateToProps = state => ({
    recipe: state.recipe,
    userName: state.authentication.userName
  });

const mapDispatchToProps = dispatch => {
    return {
        updatePasos : (pasos) => dispatch(addPasos(pasos)),
        changeCrear: (estado) => dispatch(cambiarCrear(estado)),
        vaciar: () => dispatch(empty())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddPasosScreen);
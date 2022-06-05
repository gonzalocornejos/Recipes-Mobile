import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions , ScrollView} from 'react-native';
import {useState, useRef, useEffect } from 'react'
import MainButton from "../../../components/Application/Components/MainButton";
import Paso from "../../../components/Recipes/Paso";
import AddButton from '../../../components/Application/Components/AddButton';
import BackArrow from '../../../components/Application/Icons/BackArrow';
import { addPasos } from '../../../stores/CreateRecipe/Actions/RecipeActions';
import { connect } from 'react-redux';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const AddPasosScreen = ({navigation,updatePasos,recipe}) => {
    const scrollViewRef = useRef();

    const [pasos,setPasos] = useState([]);

    useEffect(() => {
        console.log(recipe);
    }, [])

    const agregarPaso = () => {
        const numero = pasos ? pasos.length + 1 : 1
        const newPaso = {
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

    const onPublicar = () => {
        updatePasos(pasos);
        console.log(recipe);
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
    recipe: state.recipe
  });

const mapDispatchToProps = dispatch => {
    return {
        updatePasos : (pasos) => dispatch(addPasos(pasos))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddPasosScreen);
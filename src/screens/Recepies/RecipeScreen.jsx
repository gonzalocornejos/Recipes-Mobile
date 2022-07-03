import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions , ScrollView, TextInput, SafeAreaView, Alert} from 'react-native';
import {useState, useEffect } from 'react'
import Paso from '../../components/Recipes/Paso';
import BackArrow from '../../components/Application/Icons/BackArrow';
import axios from 'axios';
import environment from '../../constants/environment';
import Ingrediente from '../../components/Recipes/Ingrediente';
import Input from '../../components/Application/Components/Input';
import StarIcon from '../../components/Application/Icons/StarIcon';
import { Rating } from 'react-native-ratings';
import { connect } from 'react-redux';
import {EDITAR} from "../../stores/CreateRecipe/Constants/index";
import {addEverything, cambiarEditar} from "../../stores/CreateRecipe/Actions/RecipeActions";
import EditIcon from '../../components/Application/Icons/EditIcon';
import DeleteIcon from '../../components/Application/Icons/DeleteIcon';


const RecipeScreen = ({route, navigation,nickName,changeEditar,updateEverything}) => {
    const {idRecipe} = route.params;
    const [recipe,setRecipe] = useState({
        imagen: '',
        nombre : '',
        nombreUsuario: '',
        descripcion: '',
        categorias: [],
        ingredientes: [],
        pasos: [],
        calificacion: 0,
        porciones: '0'
    });
    const [dbFilters, setdbFilters] = useState(undefined)
    const [puntuacionUsuario, setPuntuacionUsuario] = useState(0);
    const [factorConversion, setFactorConversion] = useState();
    const [porcionesOriginales, setPorcionesOriginales] = useState();

    useEffect(() => {
        axios.get(`${environment.API_URL}/recetas/${idRecipe}`)
        .then(recipeRes => {
            setRecipe(recipeRes.data)
            setPorcionesOriginales(recipeRes.data.porciones)
        })
        .catch(error => console.log(error))
        
        axios.get(`${environment.API_URL}/recetas/filtros`)
        .then(response => setdbFilters(response.data))
        .catch(error => console.log(error))

        axios.get(`${environment.API_URL}/recetas/puntaje/${nickName}/${idRecipe}`)
        .then(res => setPuntuacionUsuario(res.data))
        .catch(error => setPuntuacionUsuario(0))

        setFactorConversion(1)
    }, [idRecipe])

    const onEditar = () => {
        changeEditar(EDITAR)
        updateEverything(recipe.nombre,recipe.descripcion,recipe.porciones,recipe.imagen,recipe.ingredientes,recipe.categorias,recipe.pasos)
        navigation.navigate("Create")
    }

    const onDelete = () => {
        Alert.alert("Atención!", "Seguro que quieres eliminar esta receta? Esta acción es irreversible", [
            {
              text: "Cancelar",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Aceptar", onPress: () => {
                axios.delete(`${environment.API_URL}/recetas/${nickName}/${idRecipe}`)
                .then(res => navigation.navigate("Home"))
                .catch(error => navigation.navigate("Home"))
            } }
          ])
    }

    const ratingCompleted = (rating) => {
        axios.post(`${environment.API_URL}/recetas/puntuar/${idRecipe}/${nickName}/${rating}`)
        .then(res => Alert.alert("Atención", "Haz puntuado la receta, recuerda que puedes cambiar tu opnion"))
        .catch(error => Alert.alert("Atención", "No se ha podido puntuar la receta"))
    }

    const cambiarFactor = (newFactor) => {
        setFactorConversion(newFactor);
        setRecipe({...recipe,porciones:newFactor*porcionesOriginales})
    }

    const onChangePorciones = (newPorc) => {
        setRecipe({...recipe,porciones:newPorc})
        setFactorConversion(newPorc/porcionesOriginales)
    }

    return (
        <View>
            <View style={{flexDirection:'row' , paddingTop: 49*heightFactor, width: '100%'}}>
                <TouchableOpacity onPress={() => {navigation.navigate("Home")}} style={styles.arrowBtn}>
                    <BackArrow style={styles.arrowBtn}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>{recipe.nombre}</Text>
                {recipe.nombreUsuario === nickName ? 
                <>
                    <TouchableOpacity onPress={onEditar}>
                        {/* <Image source={require('../../../assets/images/ui/EditButton.png')} style={styles.edit}/> */}
                        <EditIcon style={styles.edit}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDelete}>
                        <EditIcon style={styles.delete}/>
                    </TouchableOpacity>
                </>
                : <></>}
            </View>
            <View style={{left: 32*widthFactor}}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={{paddingBottom: '150%'}}> 
                    <View style={styles.imgBox}>
                        <Image source={{uri: recipe.imagen ? recipe.imagen : null}}
                            resizeMode="cover" 
                            style={{width: '100%', height: '100%', borderRadius: 10}}/>
                    </View>      
                    <View style={styles.createdBy}>
                        <Text>Receta hecha por: {recipe.nombreUsuario}</Text>
                    </View>  
                    <View>
                        <TextInput style={styles.descInput}
                                placeholder='Descripcion'
                                value={recipe.descripcion}
                                multiline={true}
                        />   
                    </View>   
                    <View style={styles.categoryContainer}>
                        {recipe.categorias.map((categoria, index) => (
                            <Text key={index} style={styles.category}>{categoria.item}</Text>
                        ))}                    
                    </View> 
                    <View style={styles.container}>
                        <Text style={{fontSize: 25 * heightFactor, fontWeight:'500'}}>
                            Ingredientes
                        </Text>
                        {dbFilters 
                         ? recipe.ingredientes.map((ingrediente, index) => (
                             <Ingrediente 
                                isViewMode={true} 
                                element={ingrediente} 
                                key={index + recipe.nombre} 
                                index={index} 
                                unidades={dbFilters.unidades}
                                factorConversion={factorConversion}
                                cambiarFactor={(newFactor) => {cambiarFactor(newFactor)}}/>
                         ))
                         : <></>}
                    </View>
                    <View style={styles.container}>
                        <Text style={{fontSize: 25 * heightFactor, fontWeight:'500'}}>
                            Pasos
                        </Text>
                        {recipe.pasos.map((paso, index) => (
                            <Paso element={paso} key={index + recipe.nombre} index={index} isViewMode={true}/>
                        ))}
                    </View>
                    <View style={[styles.container, {backgroundColor: 'white', padding: 15, borderRadius: 10}]}>
                        <Text style={{fontSize: 20 * heightFactor, fontWeight:'500', marginRight: 50, alignSelf:'center'}}>Porciones</Text>
                        <Input
                            width='50%'
                            keyboardType={'number-pad'}
                            value={recipe.porciones.toString()}
                            setValue = {(newPorc) => {onChangePorciones(newPorc)}}                        
                        />
                    </View>   
                    <View style={styles.container}>
                        {
                            nickName === recipe.nombreUsuario 
                            ? <></>
                            : <><Text style={{fontSize: 20 * heightFactor, fontWeight:'500', width:'100%', textAlign:'center'}}>Calificar Receta</Text> 
                                <Rating
                                    key={idRecipe}
                                    type='custom'
                                    ratingBackgroundColor='#F2F2F2'
                                    imageSize={40}
                                    startingValue={puntuacionUsuario ? puntuacionUsuario : '0'}
                                    onFinishRating={(raiting) => ratingCompleted(raiting)}
                                    style={{ marginLeft: 60, marginTop: 20 }}
                                />  
                                </>
                        }  
                    </View> 
                </ScrollView>  
            </SafeAreaView>       
            </View>
        </View>
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection:'row',
        width: 326*widthFactor,
        top: 250*heightFactor,
        marginTop: 10*heightFactor
    },  
    categoryContainer: {
        flexWrap: 'wrap',
        flexDirection:'row',
        width: 326*widthFactor,
        top: 240*heightFactor,
    },
    category:{
        marginRight: 10 * widthFactor,
        backgroundColor: 'rgba(255, 75, 58, .5)',
        padding: 8 * widthFactor,
        borderRadius: 10,
        marginBottom: 5
    },
    arrowBtn:{
        width: 31*widthFactor,
        height: 31*heightFactor,
        alignSelf: 'flex-end',
        marginLeft: 21*widthFactor,
        marginBottom: 10*widthFactor
    },
    imgBox: {
        width: 326*widthFactor,
        height: 155*heightFactor,
        top: 40*heightFactor,
        backgroundColor: '#C4C4C480',
        borderRadius: 10,
    },
    createdBy: {
        top: 50*heightFactor,
    },
    headerText:{
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 36*heightFactor,
        color: "#FF4B3A",
        paddingLeft: 13*widthFactor,
    } ,
    descInput:{
        position: 'absolute',
        width: 326*widthFactor,
        height: 153*heightFactor,
        top: 70*heightFactor,
        borderColor: '#3D3D3D',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15*heightFactor,
        textAlign:'left',
        textAlignVertical: 'top',
        backgroundColor: 'white'
    },
    edit:{
        width: 31*widthFactor,
        height: 31*heightFactor,
        alignSelf: 'baseline',
        marginTop: 10*heightFactor,
        marginLeft: 25*widthFactor,
    },
    delete : {
        width: 31*widthFactor,
        height: 31*heightFactor,
        alignSelf: 'baseline',
        marginTop: 10*heightFactor,
        marginLeft: 15*widthFactor,
    }
});

const mapStateToProps = state => ({
    nickName: state.authentication.userName
});

const mapDispatchToProps = dispatch => {
    return {
        updateEverything : (nombre, descripcion,porciones,imagen,ingredientes,categorias,pasos) => dispatch(addEverything(nombre, descripcion,porciones,imagen,ingredientes,categorias,pasos)),
        changeEditar: (estado) => dispatch(cambiarEditar(estado)),
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(RecipeScreen);
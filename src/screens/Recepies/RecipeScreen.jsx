import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions , ScrollView, TextInput, SafeAreaView} from 'react-native';
import {useState, useEffect } from 'react'
import Paso from '../../components/Recipes/Paso';
import BackArrow from '../../components/Application/Icons/BackArrow';
import axios from 'axios';
import environment from '../../constants/environment';
import Ingrediente from '../../components/Recipes/Ingrediente';
import Input from '../../components/Application/Components/Input';
import StarIcon from '../../components/Application/Icons/StarIcon';

const RecipeScreen = ({route, navigation}) => {
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
        porciones: 0
    });
    const [dbFilters, setdbFilters] = useState(undefined)

    useEffect(() => {
        axios.get(`${environment.API_URL}/recetas/${idRecipe}`)
        .then(recipeRes => {
            console.log(recipeRes.data)
            setRecipe(recipeRes.data)
        })
        .catch(error => console.log(error))

        axios.get(`${environment.API_URL}/recetas/filtros`)
        .then(response => setdbFilters(response.data))
        .catch(error => console.log(error))

    }, [idRecipe])

    return (
        <View>
            <View style={{flexDirection:'row' , paddingTop: 49*heightFactor, width: '100%'}}>
                <TouchableOpacity onPress={() => {navigation.navigate("Home")}} style={styles.arrowBtn}>
                    <BackArrow style={styles.arrowBtn}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>{recipe.nombre}</Text>
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
                            <Text key={index} style={styles.category}>{categoria}</Text>
                        ))}                    
                    </View> 
                    <View style={styles.container}>
                        <Text style={{fontSize: 25 * heightFactor, fontWeight:'500'}}>
                            Ingredientes
                        </Text>
                        {dbFilters 
                         ? recipe.ingredientes.map((ingrediente, index) => (
                             <Ingrediente isViewMode={true} element={ingrediente} key={index + recipe.nombre} index={index} unidades={dbFilters.unidades}/>
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
                        />
                    </View>   
                    <View style={styles.container}>
                        <Text style={{fontSize: 20 * heightFactor, fontWeight:'500', width:'100%', textAlign:'center'}}>Calificar Recetas</Text> 
                        <View style={[styles.container, {justifyContent: 'space-around', marginTop: 25 * heightFactor}]}>
                            <StarIcon isActive style={{transform: [{ scale: 2 }]}}/>   
                            <StarIcon isActive style={{transform: [{ scale: 2 }]}}/>   
                            <StarIcon isActive style={{transform: [{ scale: 2 }]}}/>   
                            <StarIcon isActive style={{transform: [{ scale: 2 }]}}/>   
                            <StarIcon isActive={false} style={{transform: [{ scale: 2 }]}}/>   
                        </View>                      
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
    }
});

export default RecipeScreen;
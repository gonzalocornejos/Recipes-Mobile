import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions , ScrollView} from 'react-native';
import {useState, useRef, useEffect } from 'react'
import MainButton from "../../../components/Application/Components/MainButton";
import Categoria from "../../../components/Recipes/Categoria";
import AddButton from '../../../components/Application/Components/AddButton';
import BackArrow from '../../../components/Application/Icons/BackArrow';
import { addCategorias } from '../../../stores/CreateRecipe/Actions/RecipeActions';
import { connect } from 'react-redux';
import axios from "axios";
import environment from "../../../constants/environment";
import uuid from 'react-native-uuid';



const AddCategoriasScreen = ({navigation,updateCategories}) => {
    const scrollViewRef = useRef();
 
	const [categorias,setCategorias] = useState([]);

    const [dbFilters, setdbFilters] = useState({
        unidades: [{
            id: 0,
            item: 'Cargando...'
        }],
        categorias: [{
            id: 0,
            item: 'Cargando...'
        }]
    })

    useEffect(()=> {
        axios.get(`${environment.API_URL}/recetas/filtros`)
            .then(response => setdbFilters(response.data))
            .catch(error => console.log(error))
    },[])

	const agregarCategoria = () => {
	        const newCategoria = {
                id: uuid.v4(),
	            categoria:{},
	            valido: false
	        }
	        setCategorias([...categorias,newCategoria]);
	    }
	    
	const cambiarCategoria = (updatedCategoria,index) => {
	        let categoriasCopy = [...categorias];
	        categoriasCopy[index] = updatedCategoria;
	        setCategorias(categoriasCopy)
	    }

	const eliminarCategoria = (index) => {
	        let data = [...categorias];
	        data.splice(index, 1)
	        setCategorias(data)
	    } 
    
    const verificarCategorias = () => {
        let resp = true;
        categorias.forEach((categoria) => {
            if(!categoria.valido) resp = false;
        })
        return resp;
    }

    const onSiguiente = () => {
        updateCategories(categorias);
        navigation.navigate('AddPasos')
    }

	return (
        <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={{flexDirection:'row' , paddingTop: 49*heightFactor, width: '100%'}}>
                <BackArrow style={styles.arrowBtn} onPress={() => {navigation.navigate('AddIngredientes')}}/>
                <Text style={styles.headerText}>Categorias</Text>
            </View>
            <ScrollView style ={{height:550*heightFactor, overflow:'scroll', marginTop:7*heightFactor}} 
                        contentContainerStyle={{flexDirection:'column', alignItems:'center'}}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {categorias.map((element,index) => (
                    <Categoria 
                    element={element} 
                    key={element.id} 
                    index={index} 
                    onChange={(u,i) => cambiarCategoria(u,i)} 
                    onDelete={(index) => eliminarCategoria(index)} 
                    categorias={dbFilters.categorias}/>
                ))}
                <AddButton onPress={agregarCategoria}/>
            </ScrollView>
            <View style = {styles.mainButton}>
                <MainButton
                    value="SIGUIENTE"
                    onPress={() => {onSiguiente()}}
                    active = {categorias.length!==0 && verificarCategorias()? true : false}/>
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
            alignSelf: 'center',
            marginLeft: 21*widthFactor,
        },
        headerText:{
            width: 180*widthFactor,
            height: 53*heightFactor,
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
        updateCategories : (categorias) => dispatch(addCategorias(categorias))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddCategoriasScreen);
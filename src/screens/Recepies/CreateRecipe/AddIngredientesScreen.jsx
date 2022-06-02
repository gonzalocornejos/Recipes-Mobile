import { TouchableOpacity, View, Text, Image, StyleSheet, Dimensions , ScrollView} from 'react-native';
import {useState, useRef, useEffect } from 'react'
import MainButton from "../../../components/Application/Components/MainButton";
import Ingrediente from "../../../components/Recipes/Ingrediente";
import AddButton from '../../../components/Application/Components/AddButton';
import BackArrow from '../../../components/Application/Icons/BackArrow';
import { addIngredientes } from '../../../stores/CreateRecipe/Actions/RecipeActions';
import { connect } from 'react-redux';

const AddIngredientesScreen = ({navigation,updateIngredients,recipe}) => {
    const scrollViewRef = useRef();
    const [ingredientes,setIngredientes] = useState([]);

    useEffect(()=> {
        console.log(recipe)
    },[])

    const agregarIngrediente = () => {
        const newIngrediente = {
            name:"",
            cant: "",
            unit:"",
            desc: "",
            valido: false
        }
        setIngredientes([...ingredientes,newIngrediente]);
    }

    const cambiarIngrediente = (updatedIngrediente,index) => {
        let ingredientesCopy = [...ingredientes];
        ingredientesCopy[index] = updatedIngrediente;
        setIngredientes(ingredientesCopy)
    }

    const eliminarIngrediente = (index) => {
        let data = [...ingredientes];
        data.splice(index, 1)
        setIngredientes(data)
    }

    const verificarIngredientes = () => {
        let resp = true;
        ingredientes.forEach((ingrediente) => {
            if(!ingrediente.valido) resp = false;
        })
        return resp;
    }

    const onSiguiente = () => {
        updateIngredients(ingredientes);
        navigation.navigate('AddCategorias')
    }

    return (
        <View style={{flexDirection:'column', alignItems:'center'}}>
            <View style={{flexDirection:'row' , paddingTop: 49*heightFactor, width: '100%'}}>
                <BackArrow style={styles.arrowBtn} onPress={() => {navigation.navigate('Create')}}/>
                <Text style={styles.headerText}>Ingredientes</Text>
            </View>
            <ScrollView style ={{height:550*heightFactor, overflow:'scroll', marginTop:1*heightFactor}} 
            contentContainerStyle={{flexDirection:'column', alignItems:'center'}}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {ingredientes.map((element,index) => (
                    <Ingrediente element key={index} index={index} onChange={cambiarIngrediente} onDelete={eliminarIngrediente}/>
                ))}
                <AddButton onPress={agregarIngrediente}/>
                {/*<AddButton onPress={eliminarIngrediente}/>*/}
            </ScrollView>
            <View style = {styles.mainButton}>
                <MainButton
                    value="SIGUIENTE"
                    onPress={() => {onSiguiente}}
                    active = {ingredientes.length!==0 && verificarIngredientes()? true : false}/>
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
            width: 210*widthFactor,
            height: 48*heightFactor,
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
        updateIngredients : (ingredientes) => dispatch(addIngredientes(ingredientes))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddIngredientesScreen);
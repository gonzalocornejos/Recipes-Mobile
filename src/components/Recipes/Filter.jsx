import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Dimensions, Image, SafeAreaView, ScrollView } from "react-native"
import BackArrow from "../Application/Icons/BackArrow";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { useEffect, useState } from "react";
import Input from "../Application/Components/Input";
import { LogBox } from "react-native";
import axios from "axios";
import environment from "../../constants/environment";

const orderByFilter = [
    {
        id: 1,
        item: 'Fecha Ascendente',
        name: 'RecipeId',
        order: 'ASC'
    },
    {
        id: 2,
        item: 'Fecha Descendente',
        name: 'RecipeId',
        order: 'DESC'
    },
    {
        id: 3,
        item: 'Nombre Ascendente',
        name: 'Nombre',
        order: 'ASC'
    },
    {
        id: 4,
        item: 'Nombre Descendente',
        name: 'Nombre',
        order: 'DESC'
    }
]

const Filter = ({closeModal, setFilter, loadRecipes, onlyFavorites = false, nickName}) => {  
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedIngredientes, setSelectedIngredientes] = useState([])
    const [selectedIngredientesExcluidos, setSelectedIngredientesExcluidos] = useState([])
    const [alias, setAlias] = useState('')
    const [orderBy, setOrderBy] = useState({})

    const [dbFilters, setdbFilters] = useState({
        categorias: [{
            id: 0,
            item: 'Cargando...'
        }],
        ingredientes: [{
            id: 0,
            item: 'Cargando...'
        }]
    })

    useEffect(() => {
        axios.get(`${environment.API_URL}/recetas/filtros`)
            .then(response => setdbFilters(response.data))
            .catch(error => console.log(error))
      }, [])


    const actionFilter = () => {
        // setFilter({
        //     filter : {
        //         nombre : '',
        //         tipoPlatos : selectedCategories,
        //         ingredientes : selectedIngredientes,
        //         ingredientesExcluidos: selectedIngredientesExcluidos,
        //         nickName: alias,
        //         usuarioLogueado : nickName,
        //         soloFavoritos : onlyFavorites
        //     },
        //     pageNumber : 1,
        //     pageSize : 20,
        //     sortField : orderBy ? orderBy.name : 'RecipeId',
        //     sortOrder : orderBy ? orderBy.order :'DESC'
        // })
        // loadRecipes()
         closeModal()
    }

    const onCategoriesChange = () => {
        return (item) => setSelectedCategories(xorBy(selectedCategories, [item], 'id'))
    }

    const onIngredientesChange = () => {
        return (item) => setSelectedIngredientes(xorBy(selectedIngredientes, [item], 'id'))
    }

    const onIngredientesExcluidosChange = () => {
        return (item) => setSelectedIngredientesExcluidos(xorBy(selectedIngredientesExcluidos, [item], 'id'))
    }

    const onOrderByChange = () => {
        return (val) => setOrderBy(val)
    }

    return (
        <View style={styles.Div}>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <TouchableOpacity  ableHighlight onPress={() => actionFilter()} style={styles.logout}>
                        <BackArrow/>
                    </TouchableOpacity>
                    <Text style={styles.text}>Filtros</Text>             
            </View>                 
                <View style={styles.titleDiv}>
                    <Text style={styles.title}>
                        Categorias
                    </Text>
                    <SelectBox
                        label=""
                        inputPlaceholder="Buscar"
                        arrowIconColor="#000000"
                        searchIconColor="#000000"
                        toggleIconColor="#000000"
                        multiOptionContainerStyle={{backgroundColor: '#FF4B3A'}}
                        options={dbFilters.categorias}
                        selectedValues={selectedCategories}
                        onMultiSelect={onCategoriesChange()}
                        onTapClose={onCategoriesChange()}
                        isMulti
                    />
                </View>
                <View style={styles.titleDiv}>
                    <Text style={styles.title}>
                        Ingredientes Incluidos
                    </Text>
                    <SelectBox
                        label=""
                        inputPlaceholder="Buscar"
                        arrowIconColor="#000000"
                        searchIconColor="#000000"
                        toggleIconColor="#000000"
                        multiOptionContainerStyle={{backgroundColor: '#FF4B3A'}}
                        options={dbFilters.ingredientes}
                        selectedValues={selectedIngredientes}
                        onMultiSelect={onIngredientesChange()}
                        onTapClose={onIngredientesChange()}
                        isMulti
                    />
                </View>
                <View style={styles.titleDiv}>
                    <Text style={styles.title}>
                        Ingredientes Excluidos
                    </Text>
                    <SelectBox
                        label=""
                        inputPlaceholder="Buscar"
                        arrowIconColor="#000000"
                        searchIconColor="#000000"
                        toggleIconColor="#000000"
                        multiOptionContainerStyle={{backgroundColor: '#FF4B3A'}}
                        options={dbFilters.ingredientes}
                        selectedValues={selectedIngredientesExcluidos}
                        onMultiSelect={onIngredientesExcluidosChange()}
                        onTapClose={onIngredientesExcluidosChange()}
                        isMulti
                    />
                </View>
                <View style={styles.titleDiv}>
                    <Text style={styles.title}>
                        Usuario
                    </Text>
                    <Input 
                        style={styles.input}
                        placeholder="Creador de la receta" 
                        value={alias} 
                        setValue={setAlias}
                    />   
                </View>
                <View style={styles.titleDiv}>
                    <Text style={styles.title}>
                        Ordenar por:
                    </Text>
                    <SelectBox
                        label=""
                        inputPlaceholder="Buscar"
                        arrowIconColor="#000000"
                        searchIconColor="#000000"
                        toggleIconColor="#000000"
                        options={orderByFilter}
                        value={orderBy}
                        onChange={onOrderByChange()}
                        hideInputFilter={true}
                    />
                </View>
        </View>  
    )
}

const widthFactor = Dimensions.get('window').width/390;
const heightFactor = Dimensions.get('window').height/844;

const styles = StyleSheet.create({
    Div : {
        width: '100%',
        height: '80%',
        padding: 20,
        paddingTop: StatusBar.currentHeight
    },
    text: {
        fontSize: 36,
        marginBottom: 15,
        marginLeft: '5%',
        marginTop: '5%',
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: '#FF4B3A'
    },
    logout : {
        alignSelf: 'center'
    },
    arrowBtn:{
        width: 31*widthFactor,
        height: 31*heightFactor,
        alignSelf: 'flex-end',
        marginLeft: 21*widthFactor,
    },
    titleDiv: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginBottom: '5%'
    },
    title: {       
        fontSize: 25,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold'
    }
});


export default Filter;
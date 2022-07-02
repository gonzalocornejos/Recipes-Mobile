import { View, StyleSheet, Text, ScrollView, StatusBar, SafeAreaView, RefreshControl, TouchableOpacity  } from "react-native"
import Input from "../../components/Application/Components/Input";
import FilterIcon from "../../components/Application/Icons/FilterIcon";
import Card from "../../components/Recipes/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import environment from "../../constants/environment";
import { connect } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Filter from "../../components/Recipes/Filter";


const HomeScreen = ({navigation, nickName}) => {
    const isFocused = useIsFocused();
    const [recipes, setRecipes] = useState([])
    const [filter, setFilter] = useState({
        filter : {
            nombre : '',
            tipoPlatos : [],
            ingredientes : [],
            ingredientesExcluidos: [],
            nickName: '',
            usuarioLogueado : nickName,
            soloFavoritos : false
        },
        pageNumber : 1,
        pageSize : 20,
        sortField : 'RecipeId',
        sortOrder : 'DESC'
    })
    const [refreshing, setRefreshing] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        loadRecipes();
    }, [isFocused, filter])

    const loadRecipes = () => {
        setRefreshing(true);
        axios.post(`${environment.API_URL}/recetas/buscar`, filter)
            .then(response => setRecipes(response.data.items))
            .catch(error => console.log(error)) 
            .finally(f => setRefreshing(false))
    }

    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const setFilterFn = (param) => {
        setFilter(param)
    }

    return (
        <>
        { isModalOpen 
            ? <Filter closeModal={toggleModal} setFilter={(filter) => setFilterFn(filter)} loadRecipes={loadRecipes} onlyFavorites={false} nickName={nickName}/>
            :
        <View style={styles.inputDiv}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.text}>Recetas</Text>
                </View>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Input
                        placeholder="Buscar"
                        width="87%" 
                    />
                   <TouchableOpacity style={styles.touchable} onPress={() => toggleModal()}>
                            <FilterIcon
                                style={styles.filter}
                            />
                    </TouchableOpacity>    
                </View>
               
                <View>
                    <SafeAreaView style={{marginTop:'5%'}}>
                        <ScrollView 
                        refreshControl={
                            <RefreshControl
                              refreshing={refreshing}
                              onRefresh={loadRecipes}
                            />
                        }
                        showsVerticalScrollIndicator={false} 
                        contentContainerStyle={{paddingBottom: 30}}>
                            {recipes.length === 0 
                                ? <Text>No se han encontrado recetas</Text>
                                : recipes.map((recipe) => (
                                <Card 
                                navigation={navigation}
                                key={recipe.recipeId.toString() + recipe.esFavorito.toString() }
                                id={recipe.recipeId}
                                author={recipe.nickName} 
                                recipeName={recipe.nombre}
                                score={recipe.valoracionPromedio}
                                isFavorite={recipe.esFavorito} 
                                imageUri={recipe.fotoFinal}/>
                            ))}                            
                        </ScrollView>
                    </SafeAreaView>     
                </View>                     
        </View>  
      }
    </>     
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 36,
        marginBottom: 15,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: '#FF4B3A'
    },
    inputDiv : {
        width: '100%',
        height: '80%',
        padding: 20,
        marginTop: 20,
        paddingTop: StatusBar.currentHeight
    },
    filter: {
        alignSelf: 'flex-end',
        marginLeft: '3%'
    },
    touchable: {
        justifyContent: 'center'
    }
});

const mapStateToProps = state => ({
    nickName: state.authentication.userName
  });

export default connect(mapStateToProps)(HomeScreen);
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView } from "react-native"
import Input from "../../../components/Application/Components/Input";
import FilterIcon from "../../../components/Application/Icons/FilterIcon";
import Card from "../../../components/Recipes/Card";

const MySavedRecipesScreen = () => {
    return (
        <View style={styles.inputDiv}>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Text style={styles.text}>Recetas Favoritas</Text>
                </View>
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                    <Input
                        placeholder="Buscar"
                        width="87%" 
                    />
                   <FilterIcon
                        style={styles.filter}
                    />
                </View>
               
                <View>
                    <SafeAreaView style={{marginTop:'5%'}}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                            {/* 20 recetas */}
                             <Card author="Matias Fernandez" recipeName="Ensalada de Verduras" score={4.3} isFavorite imageUri={{uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80"}}/>
                             <Card author="Jorge Benavides" recipeName="Ñoquis" score={4.9} isFavorite imageUri={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"}}/>
                             <Card author="Santiago Fernandez" recipeName="Wok de pollo" score={3.8} isFavorite imageUri={{uri: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Au-Gratin-Peas-and-Potatoes_EXPS_GHBZ18_11524_E08_08_5b-4.jpg?fit=696,696"}}/>
                             <Card author="Jorge Benavides" recipeName="Ensalada Cesar" score={4.3} isFavorite imageUri={{uri: "https://media.istockphoto.com/photos/arabic-and-middle-eastern-dinner-table-hummus-tabbouleh-salad-salad-picture-id1175505781?k=20&m=1175505781&s=612x612&w=0&h=STomby2lCtcvpl_hxK6RhknQQWrkvpkHcoDLD4zttFk="}}/>
                             <Card author="Jorge Benavides" recipeName="Hamburguesa Vegana" score={3.3} isFavorite imageUri={{uri: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"}}/>
                        </ScrollView>
                    </SafeAreaView>     
                </View>                     
        </View>       
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
        alignSelf: 'center',
        marginLeft: '3%'
    }
});

export default MySavedRecipesScreen;
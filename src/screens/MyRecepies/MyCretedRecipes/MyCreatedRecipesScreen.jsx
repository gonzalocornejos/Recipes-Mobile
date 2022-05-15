import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, TouchableOpacity  } from "react-native"
import { connect } from "react-redux";
import Input from "../../../components/Application/Components/Input";
import FilterIcon from "../../../components/Application/Icons/FilterIcon";
import LogoutIcon from "../../../components/Application/Icons/LogoutIcon";
import Card from "../../../components/Recipes/Card";
import { signOut } from "../../../stores/Authentication/Actions/AuthenticationActions";

const MyCreatedRecipesScreen = ({logout}) => {
    return (
        <View style={styles.inputContainer}>
            <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                <Text style={styles.text}>Mis Recetas</Text>
                <TouchableOpacity  ableHighlight onPress={() => logout()} style={styles.logout}>
                    <LogoutIcon />
                </TouchableOpacity>
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
                             <Card own author="Santiago Semhan" recipeName="Ensalada de Verduras" score={4.3} isFavorite imageUri={{uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80"}}/>
                             <Card own author="Santiago Semhan" recipeName="Hamburguesa Vegana" score={3.1} imageUri={{uri: "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000"}}/>
                             <Card own author="Santiago Semhan" recipeName="Wok de pollo" score={3.8} isFavorite imageUri={{uri: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Au-Gratin-Peas-and-Potatoes_EXPS_GHBZ18_11524_E08_08_5b-4.jpg?fit=696,696"}}/>
                             <Card own author="Santiago Semhan" recipeName="Estofado" score={2.6} imageUri={{uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80"}}/>
                             <Card own author="Santiago Semhan" recipeName="Wok de pollo" score={4.7} imageUri={{uri: "https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000"}}/>
                             <Card own author="Santiago Semhan" recipeName="Ensalada de Verduras" score={1.3} imageUri={{uri: "https://www.refrigeratedfrozenfood.com/ext/resources/NEW_RD_Website/DefaultImages/default-pasta.jpg?1430942591"}}/>
                        </ScrollView>
                    </SafeAreaView>     
                </View>                     
        </View>       
    )
}

const styles = StyleSheet.create({
    logout : {
        marginLeft: '33%',
    },
    filter: {
        alignSelf: 'center',
        marginLeft: '3%'
    },
    text: {
        fontSize: 36,
        marginBottom: 15,
        fontFamily: 'Roboto-Regular',
        fontWeight: 'bold',
        color: '#FF4B3A'
    },
    inputContainer : {
        width: '100%',
        height: '80%',
        padding: 20,
        marginTop: 20,
        paddingTop: StatusBar.currentHeight
    },
});

const mapStateToProps = state => ({
    token: state.authentication.userToken
  });

const mapDispatchToProps = dispatch => {
    return {
      logout : () => dispatch(signOut())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(MyCreatedRecipesScreen);
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, StyleSheet } from "react-native";

// Screens
import LoginScreen from "../screens/Authentication/Login/LoginScreen";
import RegisterScreen from "../screens/Authentication/Register/RegisterScreen";

import HomeScreen from "../screens/Home/HomeScreen";
import MyCreatedRecipesScreen from "../screens/MyRecepies/MyCretedRecipes/MyCreatedRecipesScreen";
import MySavedRecipesScreen from "../screens/MyRecepies/MySavedRecipes/MySavedRecipesScreen";
import CreateRecipeScreen from "../screens/Recepies/CreateRecipe/CreateRecipeScreen";


const Tab = createBottomTabNavigator();

const Tabs = () => {

    const focusTabIcon = (isFocused) => {
        return isFocused ? '#FF4B3A' : '#D3D1D8'
    }

    return (
        <Tab.Navigator 
           screenOptions={{
               tabBarShowLabel: false,
               tabBarStyle: [{
                   position: 'absolute',
                   elevation: 0,
                   backgroudColor: 'white',
                   borderTopLeftRadius: 40,
                   borderTopRightRadius: 40,
                   height: 90
               }, null]
           }}>

            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown: false, 
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.tab, {backgroundColor: focusTabIcon(focused)}]}>     
                            <Image 
                                source={require('../../assets/images/tab-icons/home-icon.png')}
                                style={styles.tabIcon}
                            />               
                        </View>
                    )
                }}/>

            <Tab.Screen name="Create" component={CreateRecipeScreen}
                options={{
                    headerShown: false, 
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.tab, {backgroundColor: focusTabIcon(focused)}]}>     
                            <Image 
                                source={require('../../assets/images/tab-icons/create-recipe-icon.png')}
                                style={styles.tabIcon}
                            />                 
                        </View>
                    )
                }}/>

            <Tab.Screen name="MySavedRecipes" component={MySavedRecipesScreen}
                options={{
                    headerShown: false, 
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.tab, {backgroundColor: focusTabIcon(focused)}]}>     
                            <Image 
                                source={require('../../assets/images/tab-icons/my-saved-recipes-icon.png')}
                                style={styles.tabIcon}
                            />                 
                        </View>
                    )
                }}/>

            <Tab.Screen name="MyCreatedRecipes" component={MyCreatedRecipesScreen}options={{
                    headerShown: false, 
                    tabBarIcon: ({focused}) => (
                        <View style={[styles.tab, {backgroundColor: focusTabIcon(focused)}]}>     
                            <Image 
                                source={require('../../assets/images/tab-icons/my-recipes-icon.png')}
                                style={styles.tabIcon}
                            />                
                        </View>
                    )
                }}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab : {
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#D3D1D8', 
        padding: 8, 
        borderRadius: 30
    },
    tabIcon: {
        tintColor: 'white',
        height: 30,
        width: 30 
    }
});

export default Tabs;
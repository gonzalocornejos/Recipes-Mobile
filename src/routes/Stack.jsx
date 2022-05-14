import { createStackNavigator } from "@react-navigation/stack";

// Screens
import LoginScreen from "../screens/Authentication/Login/LoginScreen";
import RegisterScreen from "../screens/Authentication/Register/RegisterScreen";


const Stack = createStackNavigator();

const Authentication = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}
                    options={{ headerShown: false }}
            />

            <Stack.Screen name="Register" component={RegisterScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}


export default Authentication;
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import LoginScreen from "../screens/Authentication/Login/LoginScreen";
import ChangePasswordScreen from "../screens/Authentication/RecoverPassword/ChangePasswordScreen";
import RecoverPasswordScreen from "../screens/Authentication/RecoverPassword/RecoverPasswordScreen";
import RecoveryCodeScreen from "../screens/Authentication/RecoverPassword/RecoveryCodeScreen";
import FinalRegisterScreen from "../screens/Authentication/Register/FinalRegisterScreen";
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

            <Stack.Screen name="FinalRegister" component={FinalRegisterScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="RecoveryCode" component={RecoveryCodeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}


export default Authentication;
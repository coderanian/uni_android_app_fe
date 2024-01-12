import * as Screens from "../screens/authentification/index"
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
/**
 * Authorization navigation via screens stack
 */
const AuthentificationNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Log-In"}
            screenOptions={{
                headerShown: false,
                animation: 'none'
            }}
        >
            <Stack.Screen
                name={"Log-In"}
                component={Screens.LoginScreen}
            />
            <Stack.Screen
                name={"Forgot Password"}
                component={Screens.ForgotPasswordScreen}
            />
            <Stack.Screen
                name={"Register"}
                component={Screens.RegisterScreen}
            />
        </Stack.Navigator>
    );
}

export default AuthentificationNavigator;
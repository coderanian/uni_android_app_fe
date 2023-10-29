import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";
import CustomTextInput from "../../components/Input/CustomTextInput";
import PasswordInput from "../../components/Input/PasswordInput";
import {useAuth} from "../../context/AuthContext";
import {apiUriFactory} from "../../services/apiUriFactory";

/**
 * Main log-in screen in the authorization stack
 * @author Konstantin K.
 */
const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //State to toggle message rendering in case pw changed or registration completed
    const {onLogin} = useAuth();

    /*
    useEffect(() => {
        const loadUser = async () => {
            const result = await axios.get(apiUriFactory('users'));
            console.log('Result: ', result);
        };
        testCall();
    }, []);
    */

    const login = async () => {
        if (!email || !password) {
            Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
        } else {
            const result = await onLogin(email, password);
            if (result && result.error) {
                alert(result.msg);
            }
        }
    }

    return (
        <View style={authentificationStyles.container}>
            <Text style={authentificationStyles.header}>Einloggen</Text>
            <CustomTextInput
                placeholder={"Email"}
                mailInput={true}
                onChangeInput={(input) => setEmail(input)}
            />
            <PasswordInput
                onChangeInput={(input) => setPassword(input)}
            />
            <TouchableOpacity
                style={authentificationStyles.button}
                onPress={login}
            >
                <Text style={authentificationStyles.buttonText}>Einloggen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={authentificationStyles.buttonLink}
                onPress={() => {
                    navigation.navigate("Forgot Password");
                }}
            >
                <Text style={authentificationStyles.buttonLinkText}>Passwort vergessen?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={authentificationStyles.buttonLink}
                onPress={() => {
                    navigation.navigate('Register')
                }}
            >
                <Text style={authentificationStyles.buttonLinkText}>Noch nicht regestriert?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;
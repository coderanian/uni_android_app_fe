import React, { useState} from "react";
import {View, Text, Image, TouchableOpacity, Alert} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";
import CustomTextInput from "../../components/Input/CustomTextInput";
import PasswordInput from "../../components/Input/PasswordInput";
import {useAuth} from "../../context/AuthContext";
import LogoImage from "../../assets/images/png_busash_logo.png";



/**
 * Main log-in screen in the authorization stack
 * @author Konstantin K.
 */

const LoginScreen = ({navigation}) => {
    // const LogoImage = require("/assets/images/png_busash_logo.png");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //State to toggle message rendering in case pw changed or registration completed
    const {onLogin} = useAuth();

    const login = async () => {
        if (!email || !password) {
            Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
        } else {
            const result = await onLogin(email, password);
            if (result && result.error) {
                Alert.alert(result.status, result.msg);
            }
        }
    }

    return (
        <View style={authentificationStyles.container}>
            <Image
                style={authentificationStyles.imgLogo}
                source={LogoImage}
            />
            <Text style={authentificationStyles.header}>Willkommen</Text>
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
                <Text style={authentificationStyles.buttonText}>Login</Text>
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
                {/*<Text style={authentificationStyles.buttonLinkText}>Noch nicht registriert?</Text>*/}
                <Text style={authentificationStyles.buttonLinkText}>Neu bei uns? Jetzt Registrieren!</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;
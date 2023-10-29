import React, {useEffect, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";
import ErrorMsg from "../../components/ErrorMsg";
import Ionicons from "react-native-vector-icons/Ionicons";

/**r
 * Main log-in screen in the authorization stack
 * tbu. with implementation of actual token-based authorization
 * @author Konstantin K.
 */
const LoginScreen = ({navigation, route}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //Error states if input is empty
    const [errName, setErrName] = useState(false);
    const [errPw, setErrPw] = useState(false);
    //State to toggle pw input visibility
    const [showPassword, setShowPassword] = useState(false);
    //State to toggle message rendering in case pw changed or registration completed
    const [msg, setMsg] = useState(false);
    const {setUserToken} = route.params;

    useEffect(() => {
        setMsg(route.params?.msg ? route.params?.msg : null);
    }, [route.params]);

    //Token-based authorization tbu.
    const handleSignIn = () => {
        if (username && password) {
            let token = 'token';
            setUserToken(token)
        } else {
            Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
        }
    };

    return (
        <View style={authentificationStyles.container}>
            <Text style={authentificationStyles.header}>Einloggen</Text>
            {msg && (
                <Text style={authentificationStyles.body}>{route.params.msg}</Text>
            )}
            <TextInput
                style={authentificationStyles.inputRegular}
                placeholder={"Benutzername"}
                value={username}
                onChangeText={(input) => setUsername(input)}
                onFocus={() => setErrName(false)}
                onEndEditing={() => {
                    setErrName(username.length === 0)
                }}
            />
            {errName && (
                <ErrorMsg/>
            )}
            <View style={authentificationStyles.inputContainerPw}>
                <TextInput
                    style={authentificationStyles.inputPw}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(input) => setPassword(input)}
                    onFocus={() => setErrPw(false)}
                    onEndEditing={() => {
                        setErrPw(password.length === 0)
                    }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "md-eye" : "md-eye-off"}
                        style={authentificationStyles.iconPw}
                    />
                </TouchableOpacity>
            </View>
            {errPw && (
                <ErrorMsg/>
            )}
            <TouchableOpacity
                style={authentificationStyles.button}
                onPress={handleSignIn}
            >
                <Text style={authentificationStyles.buttonText}>Einloggen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={authentificationStyles.buttonLink}
                onPress={() => {
                    setMsg(null);
                    navigation.navigate("Forgot Password");
                }}
            >
                <Text style={authentificationStyles.buttonLinkText}>Passwort vergessen?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={authentificationStyles.buttonLink}
                onPress={() => {
                    setMsg(null);
                    navigation.navigate('Register')
                }}
            >
                <Text style={authentificationStyles.buttonLinkText}>Noch nicht regestriert?</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;
import React, {useState} from "react";
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {authentificationStyles, commonStyles} from "../../assets/styles/commonStyles";
import Checkbox from 'expo-checkbox';
import CustomTextInput from "../../components/Input/CustomTextInput";
import PasswordInput from "../../components/Input/PasswordInput";
import {useAuth} from "../../context/AuthContext";
import ReturnButton from "../../components/Input/ReturnButton";

/**
 * Registration screen in the authorization stack
 */
const RegisterScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);
    const {onLogin, onRegister} = useAuth();
    const register = async () => {
        if (!username || !email || !password || !isChecked) {
            Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
        } else {
            const result = await onRegister(email, username, password);
            if (result && result.error) {
                Alert.alert(result.status, result.msg);
            } else {
                login();
            }
        }
    }

    const login = async () => {
        const result = await onLogin(email, password);
        if (result && result.error) {
            alert(result.msg);
        }else{
            navigation.navigate({
                name: "Log-In",
            });
        }
    }

    return (
        <View style={authentificationStyles.container}>
            <Text style={authentificationStyles.header}>Registrieren</Text>
            <CustomTextInput
                placeholder={"Email"}
                mailInput={true}
                onChangeInput={(input) => setEmail(input)}
                mandatory={true}
            />
            <CustomTextInput
                placeholder={"Benutzername"}
                onChangeInput={(input) => setUsername(input)}
                mandatory={true}
            />
            <PasswordInput
                onChangeInput={(input) => setPassword(input)}
                pwConfirmation={true}
            />
            <View style={commonStyles.chkBoxSection}>
                <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    style={commonStyles.chkBox}
                />
                <Text>"Ich bin mindestens 18 Jahre alt"</Text>
            </View>
            <TouchableOpacity
                style={authentificationStyles.button}
                onPress={register}
            >
                <Text style={authentificationStyles.buttonText}>Registrieren</Text>
            </TouchableOpacity>
            <ReturnButton navigation={navigation}/>
        </View>
    )
}

export default RegisterScreen;
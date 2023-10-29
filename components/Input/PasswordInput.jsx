import {TextInput, TouchableOpacity, View} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import ErrorMsg from "../ErrorMsg";
import React, {useState} from "react";

/**
 * Custom password input field
 * @param onChangeInput Function to return input value to the screen rendering the component
 * @param pwConfirmation renders separate input field for validation if true
 * @returns {Element}
 * @author Konstantin K.
 */
const PasswordInput = ({onChangeInput, pwConfirmation = false}) => {
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const [passwordConf, setPasswordConf] = useState("");
    const [errConf, setErrConf] = useState(false);
    //State to toggle pw input visibility
    const [showPassword, setShowPassword] = useState(false);
    const handleConfInputChange = (input) => {
        setPasswordConf(input);
        if(onChangeInput && !errConf) {
            onChangeInput(input)
        }
    }

    const handleInputChange = (input) => {
        setPassword(input);
        if(!pwConfirmation){
            onChangeInput(input);
        }
    }

    return (
        <View>
            <View style={authentificationStyles.inputContainerPw}>
                <TextInput
                    style={authentificationStyles.inputPw}
                    placeholder={"Passwort"}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handleInputChange}
                    onFocus={() => setErr(false)}
                    onEndEditing={() => {
                        setErr(password.length === 0)
                    }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? "md-eye" : "md-eye-off"}
                        style={authentificationStyles.iconPw}
                    />
                </TouchableOpacity>
            </View>
            {err && (
                <ErrorMsg/>
            )}
            {pwConfirmation && (
                <View>
                    <View style={authentificationStyles.inputContainerPw}>
                        <TextInput
                            style={authentificationStyles.inputPw}
                            placeholder={"Passwort wiederholen"}
                            secureTextEntry={!showPassword}
                            value={passwordConf}
                            onChangeText={handleConfInputChange}
                            onFocus={() => setErrConf(false)}
                            onEndEditing={() => {
                                setErrConf(!(passwordConf === password))
                            }}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "md-eye" : "md-eye-off"}
                                style={authentificationStyles.iconPw}
                            />
                        </TouchableOpacity>
                    </View>
                    {errConf && (
                        <ErrorMsg msg={"Passwort stimmt nicht überein!"}/>
                    )}
                </View>
            )}
        </View>
    )
}

export default PasswordInput;
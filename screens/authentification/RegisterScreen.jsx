import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import ErrorMsg from "../../components/ErrorMsg";

/**
 * Registration screen in the authorization stack
 * tbu. with implementation of POST call
 * @author Konstantin K.
 */
const RegisterScreen = ({navigation}) => {
  //Input states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  //Error states if input is empty
  const [errMail, setErrMail] = useState(false);
  const [errName, setErrName] = useState(false);
  const [errPw, setErrPw] = useState(false);
  const [errPwConf, setErrPwConf] = useState(false);
  //State to toggle pw input visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = () => {
    if(username && password && password && !errPwConf){
      navigation.navigate({
        name: "Log-In",
        params: {msg: "Registrierung war erfolgreich!"}
      })
    }else{
      Alert.alert("Fehler","Bitte überprüfe deine Eingaben!");
    }
  };

  return (
    <View style={authentificationStyles.container}>
      <Text style={authentificationStyles.header}>Registrieren</Text>
      <TextInput
        style={authentificationStyles.inputRegular}
        placeholder={"Email"}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(input) => setEmail(input)}
        onFocus={() => setErrMail(false)}
        onEndEditing={() => {setErrMail(email.length === 0)}}
      />
      {errMail && (
        <ErrorMsg/>
      )}
      <TextInput
        style={authentificationStyles.inputRegular}
        placeholder={"Benutzername"}
        value={username}
        onChangeText={(input) => setUsername(input)}
        onFocus={() => setErrName(false)}
        onEndEditing={() => {setErrName(username.length === 0)}}
      />
      {errName && (
        <ErrorMsg/>
      )}
      <View style={authentificationStyles.inputContainerPw}>
        <TextInput
          style={authentificationStyles.inputPw}
          placeholder="Passwort"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(input) => setPassword(input)}
          onFocus={() => setErrPw(false)}
          onEndEditing={() => {setErrPw(password.length === 0)}}
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
      <View style={authentificationStyles.inputContainerPw}>
        <TextInput
          style={authentificationStyles.inputPw}
          placeholder="Passwort wiederholen"
          secureTextEntry={!showPassword}
          onChangeText={(input) => setPasswordConfirmation(input)}
          onFocus={() => setErrPwConf(false)}
          onEndEditing={() => {setErrPwConf(!(passwordConfirmation === password))}}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "md-eye" : "md-eye-off"}
            style={authentificationStyles.iconPw}
          />
        </TouchableOpacity>
      </View>
      {errPwConf && (
        <ErrorMsg msg={"Passwort stimmt nicht überein!"}/>
      )}
      <TouchableOpacity
        style={authentificationStyles.button}
        onPress={() => handleRegistration()}
      >
        <Text style={authentificationStyles.buttonText}>Registrieren</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen;
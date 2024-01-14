import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";

/**
 * Password retrieval in the authorization stack
 * tbu. with implementation of POST call
 */
const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (email) {
      navigation.navigate({
        name: "Log-In",
        params: {msg: "Neues Passwort wurde an deine Email versendet."}
      })
    } else {
      Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
    }
  }

    const cancel = () => {
        navigation.navigate({
            name: "Log-In"
        })
    }
  return (
    <View style={authentificationStyles.container}>
      <Text style={authentificationStyles.header}>Passwort vergessen</Text>
      <TextInput
        style={authentificationStyles.inputRegular}
        placeholder={"Email"}
        value={email}
        onChangeText={(input) => setEmail(input)}
        keyboardType={"email-address"}
        autoCapitalize={"none"}
      />
      <TouchableOpacity
        style={authentificationStyles.button}
        onPress={handleClick}
      >
        <Text style={authentificationStyles.buttonText}>Passwort wiederherstellen</Text>
      </TouchableOpacity>
        <TouchableOpacity
            style={authentificationStyles.buttonSecondary}
            onPress={cancel}
        >
            <Text style={authentificationStyles.buttonText}>Abbrechen</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ForgotPasswordScreen;
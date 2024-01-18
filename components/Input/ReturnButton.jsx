import React from "react";
import {Text, TouchableOpacity} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";

const ReturnButton = ({navigation}) => {
    const cancel = () => {
        navigation.goBack();
    }

    return (
        <TouchableOpacity
            style={authentificationStyles.buttonSecondary}
            onPress={cancel}
        >
            <Text style={authentificationStyles.buttonText}>Abbrechen</Text>
        </TouchableOpacity>
    )
};
export default ReturnButton;
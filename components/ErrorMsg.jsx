import {Text} from "react-native";
import React from "react";
import {commonStyles} from "../assets/styles/commonStyles";

/**
 * Displays error text based on the input state
 * @author Konstantin K.
 * @param msg - string to show as error, if none Pflichtfeld! is used
 */
const ErrorMsg = ({msg = "Pflichtfeld!"}) => {
    return (
        <Text style={commonStyles.msgErr}>{msg}</Text>
    )
}

export default ErrorMsg;
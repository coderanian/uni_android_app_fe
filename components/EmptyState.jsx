import React from "react";
import {Text, View} from "react-native";
import {commonStyles} from "../assets/styles/commonStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

const EmptyState = ({message}) => {
    return (
        <View style={commonStyles.container}>
            <Ionicons name="alert-circle-outline" style={commonStyles.emptyIcon}/>
            <Text>{message}</Text>
        </View>
    )
};
export default EmptyState;

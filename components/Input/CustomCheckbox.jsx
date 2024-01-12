import {Text, View} from "react-native";
import {commonStyles} from "../../assets/styles/commonStyles";
import Checkbox from "expo-checkbox";
import React, {useState} from "react";

/**
 * Custom checkbox section
 * @param text - Text to show to the right of checkbox
 * @returns {Element}
 */
const CustomCheckbox = ({text}) => {
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={commonStyles.chkBoxSection}>
            <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                style={commonStyles.chkBox}
            />
            <Text>{text}</Text>
        </View>
    )
}

export default CustomCheckbox;
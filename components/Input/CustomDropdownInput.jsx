import {Picker} from "@react-native-picker/picker";
import React, {useState} from "react";
import {commonStyles} from "../../assets/styles/commonStyles";
import {View} from "react-native";

/**
 * Custom re-usable dropdown selection field
 * @param list array of selection elements
 * @param onChangeInput parent component function to update its state
 * @param defaultSelection pass if you want to edit existing dropdown selection
 * @returns {Element}
 * @author Konstantin K.
 */
const CustomDropdownInput = ({list, onChangeInput, defaultSelection = null}) => {
    const [selection, setSelection] = useState(defaultSelection);

    /**
     * Update component state and input state in parent form
     * @param itemValue
     */
    const updateInput = (itemValue) => {
        setSelection(itemValue);
        onChangeInput(itemValue);
    }

    return (
        <View style={commonStyles.dropboxSelection}>
            <Picker
                selectedValue={selection}
                onValueChange={(itemValue, itemIndex) => {
                    if (itemValue !== null) {
                        updateInput(itemValue)
                    }
                }}
            >
                <Picker.Item
                    style={commonStyles.dropboxItem}
                    label={"Auswählen"} value={null}
                />
                {list.map((item) =>
                    <Picker.Item
                        style={commonStyles.dropboxItem}
                        label={item.label} value={item.value} key={item.label}
                    />
                )}
            </Picker>
        </View>
    )
}

export default CustomDropdownInput;
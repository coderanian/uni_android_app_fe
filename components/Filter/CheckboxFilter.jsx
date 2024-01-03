import React, {useState} from "react";
import {Text, View} from "react-native";
import Checkbox from "expo-checkbox";
import {commonStyles} from "../../assets/styles/commonStyles";

const CheckboxFilter = ({checkboxList, updateCheckboxList, initialState}) => {
    const [checked, setChecked] = useState(initialState ?? []);

    const handleCheck = (event, val) => {
        let updatedList = [...checked];
        if (val) {
            updatedList = [...checked, event];
        } else {
            updatedList.splice(checked.indexOf(event), 1);
        }
        setChecked(updatedList);
        updateCheckboxList(updatedList);
    };
    const isItemChecked = (val) => checked.includes(val);

    return (
        <View style={commonStyles.filterList}>
            {
                checkboxList.map((item) => (
                    <View key={item.value} style={commonStyles.chkBoxSection}>
                        <Checkbox style={commonStyles.chkBox} value={isItemChecked(item.value)}
                                  onValueChange={(val) => handleCheck(item.value, val)}
                        />
                        <Text>{item.label}</Text>
                    </View>
                ))
            }
        </View>
    )
}
export default CheckboxFilter;
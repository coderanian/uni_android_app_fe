import {TextInput, View} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";
import ErrorMsg from "../ErrorMsg";
import React, {useState} from "react";

/**
 * Custom input field with mandatory-toggle rendering errMsg if not filled
 * @param placeholder String shown as placeholder in the input field
 * @param onChangeInput Function to return input value to the screen rendering the component
 * @param mailInput Activate email validation via regex match
 * @param mandatory Render error message beneath if input is empty
 * @param errMsg Error message to render beneath if input is empty
 * @returns {Element}
 * @author Konstantin K.
 */
const CustomTextInput = ({placeholder, onChangeInput, mailInput= false, mandatory=false, errMsg='Pflichtfeld'}) => {
    const [inputVal, setInputVal] = useState("");
    const [err, setErr] = useState(false);
    //Pass the state to the screen for further processing
    const handleInputChange = (input) => {
        setInputVal(input);
        if(onChangeInput && !err) {
            onChangeInput(input)
        }
    }

    const validateInput = () => {
        let check = inputVal.length === 0;
        if(mailInput){
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            check = !reg.test(inputVal);
        }
        check ? setErr(check) : onChangeInput(inputVal);
    }

    return (
        <View>
            <TextInput
                style={authentificationStyles.inputRegular}
                placeholder={placeholder}
                value={inputVal}
                onChangeText={(input) => setInputVal(input)}
                onFocus={() => setErr(false)}
                onEndEditing={() => {
                    setErr(validateInput)
                }}
            />
            {mandatory && err && (
                <ErrorMsg msg={errMsg}/>
            )}
        </View>
    )
}

export default CustomTextInput;
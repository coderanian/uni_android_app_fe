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
 * @param edit Prefill input box instead of using placeholder
 * @returns {Element}
 */
const CustomTextInput = ({
        placeholder,
        onChangeInput,
        mailInput= false,
        mandatory=false,
        errMsg='Pflichtfeld',
        edit = false
    }) => {
    const [inputVal, setInputVal] = useState(edit ? placeholder : "");
    const [err, setErr] = useState(false);

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
                    autoCapitalize="none"
                    placeholder={placeholder}
                    inputMode={mailInput ? 'email' : 'text'}
                    value={inputVal}
                    onChangeText={(input) => setInputVal(input)}
                    onFocus={() => setErr(false)}
                    onEndEditing={() => {
                        setErr(validateInput);
                    }}
                    onBlur={() => {
                        setErr(validateInput);
                    }}
                />

            {mandatory && err && (
                <ErrorMsg msg={errMsg}/>
            )}
        </View>
    );
}

export default CustomTextInput;
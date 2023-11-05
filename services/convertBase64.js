import * as FileSystem from 'expo-file-system'
import {Alert} from "react-native";

/**
 * Reads image content as str and then converts it to b64
 * @author Konstantin K.
 * @param uri - picture file
 * @returns picture in base64 format
 */
export async function picToBase64 (uri){
    try {
        const content = await FileSystem.readAsStringAsync(uri, {encoding: 'base64'});
        return `data:image/jpeg;base64,${content}`
        //return base64.fromByteArray(strToUint8Arr(content));
    }catch(e){
        Alert.alert("Fehler", e);
    }
}



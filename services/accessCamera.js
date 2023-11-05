import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {picToBase64} from "./convertBase64";


export async function accessCamera () {
    const camResp = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
    });
    if (!camResp.canceled) {
        const resizedPic = await ImageManipulator.manipulateAsync(
            camResp.assets[0].uri,
            [{resize: {width: 150, height: 150}}],
            {compress: 0.7, format: 'jpeg'}
        )
        return await picToBase64(resizedPic.uri);
    }
}
import * as Location from "expo-location";
import {Alert} from "react-native";

/**
 * Returns coordinates provided by native geolocating services of Android
 * @returns geolocation information
 */
export async function accessLocation() {
    try {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status === 'granted'){
            let locDetails = await Location.getCurrentPositionAsync({});
            return {
                latitude: locDetails.coords.latitude,
                longitude: locDetails.coords.longitude,
            };
        }
        Alert.alert("Fehler","Standortermittlung nicht aktiviert");
    }catch (e) {
        Alert.alert("Fehler",e);
    }
}
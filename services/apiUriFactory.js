import ExpoGoConfig from "expo-constants";

/**
 * Extracts URI of host device to which Expo is connected if app is running via Expo
 * Required for access to local servers, connection to localhost DOESN'T work otherwise
 * @param endpoint - endpoint to access
 * @returns correct url in format http://hostip:8080 or regular domain if hosted
 * @author Konstantin K.
 */
export function apiUriFactory(endpoint) {
    //ExpoGoConfig only available when running app via Expo
    let api = ExpoGoConfig
        ? "http://localhost:8080"
        : "https://www.realapi.com"; //placeholder domain
    return api + "/api/" + endpoint;
}

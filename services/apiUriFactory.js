import ExpoGoConfig from "expo-constants";

/**
 * Extracts URI of host device to which Expo is connected if app is running via Expo
 * Required for access to local servers, connection to localhost DOESN'T work otherwise
 * @param endpoint - endpoint to access
 * @returns correct url in format http://hostip:8080 or regular domain if hosted
 */
export function apiUriFactory(endpoint) {
    //ExpoGoConfig only available when running app via Expo
    /* Please comment the other code out and use this one for LOCAL api calls
    let api = ExpoGoConfig
        //? "http://localhost:8080"
        ? "http://" + ExpoGoConfig.expoConfig.hostUri.split(":").shift() + ":8080"
        : "https://www.realapi.com"; //placeholder domain
    return api + "/api/" + endpoint;
     */
    //Current live uri for api
    let api = "https://busash.matthiaskorf.de/api/"
    return api + endpoint;
}

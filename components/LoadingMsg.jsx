import {ActivityIndicator, View, Text} from "react-native";

/**
 * Renders loading bar for authorization, tbc. if needed
 */
const LoadingMsg = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Laden...</Text>
            <ActivityIndicator size="large"/>
        </View>
    );
}

export default LoadingMsg
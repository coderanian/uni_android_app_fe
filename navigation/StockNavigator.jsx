import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Screens from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import {commonStyles} from "../assets/styles/commonStyles";
import {TouchableOpacity, View} from "react-native";
import * as React from "react";

const Stack = createNativeStackNavigator();

/**
 * User stock navigation
 * Constists of overview screen and add screen
 * @returns {JSX.Element}
 * @constructor
 */
const StockNavigator = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={"Übersicht"}
            screenOptions={{animation: "none"}}
        >
            <Stack.Screen
                name={"Übersicht"}
                component={Screens.StockScreen}
                options={{
                    headerRight: () => (
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity onPress={() => (console.log("Kaching!"))}>
                                <Ionicons name="md-arrow-down" style={commonStyles.standardIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => (console.log("Kaching!"))}>
                                <Ionicons name="md-filter" style={commonStyles.standardIcon}/>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            <Stack.Screen name={"Neues Angebot"} component={Screens.AddStockScreen}/>
            <Stack.Screen name={"Angebot Details"} component={Screens.StockDetailsScreen}/>
            <Stack.Screen name={"Angebot Bearbeiten"} component={Screens.EditStockScreen}/>
        </Stack.Navigator>
    )
}

export default StockNavigator;
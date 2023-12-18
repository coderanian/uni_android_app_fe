import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Screens from "../screens";
import {TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {commonStyles} from "../assets/styles/commonStyles";
import * as React from "react";

const Stack = createNativeStackNavigator();

const ReserveNavigator = ({navigation}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Reservierungsliste"
                component={Screens.ReservedScreen}
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
        </Stack.Navigator>
    )
}
export default ReserveNavigator;
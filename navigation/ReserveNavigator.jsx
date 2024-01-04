import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Screens from "../screens";
import {TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {commonStyles} from "../assets/styles/commonStyles";
import * as React from "react";
import SortComponent from "../components/SortComponent";
import Filter from "../components/Filter/Filter";

const Stack = createNativeStackNavigator();

const ReserveNavigator = ({navigation}) => {
    const filterParams = {types: [], categories: []};

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Reservierungsliste"
                component={Screens.ReservedScreen}
                initialParams={filterParams}
                options={({ navigation }) => ({
                    headerRight: () => (
                        <View style={{flexDirection: "row", width: 100}}>
                            <SortComponent updateSort={(sortOptions) => navigation.setParams({sortOptions})}></SortComponent>
                            <Filter
                                filterParams={filterParams}
                                updateFilter={(filterParams) => navigation.setParams({ filterParams })} />
                        </View>
                    )
                })}
            />
            <Stack.Screen name={"Angebotdetails"} component={Screens.DetailsScreen}/>
        </Stack.Navigator>
    )
}
export default ReserveNavigator;
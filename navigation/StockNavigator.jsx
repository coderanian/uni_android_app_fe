import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Screens from "../screens";
import {View} from "react-native";
import * as React from "react";
import SortComponent from "../components/SortComponent";
import Filter from "../components/Filter/Filter";

const Stack = createNativeStackNavigator();

/**
 * User stock navigation
 * Constists of overview screen and add screen
 * @returns {JSX.Element}
 * @constructor
 */
const StockNavigator = ({navigation}) => {
    let filterParams = {types: [], categories: [], status: []};

    return (
        <Stack.Navigator
            initialRouteName={"Übersicht"}
            screenOptions={{animation: "none"}}
        >
            <Stack.Screen
                name={"Übersicht"}
                component={Screens.StockScreen}
                initialParams={filterParams}
                options={({navigation}) => ({
                    headerRight: () => (
                        <View style={{flexDirection: "row", width: 100}}>
                            <SortComponent
                                updateSort={(sortOptions) => navigation.setParams({sortOptions})}
                            />
                            <Filter
                                filterParams={filterParams}
                                updateFilter={(filterParams) => navigation.setParams({ filterParams })}
                            />
                        </View>
                    )
                })}
            />
            <Stack.Screen name={"Neues Angebot"} component={Screens.AddStockScreen}/>
            <Stack.Screen name={"Angebot Details"} component={Screens.StockDetailsScreen}/>
            <Stack.Screen name={"Angebot Bearbeiten"} component={Screens.EditStockScreen}/>
        </Stack.Navigator>
    )
}

export default StockNavigator;
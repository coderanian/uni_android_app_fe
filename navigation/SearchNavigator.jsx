import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Screens from "../screens";
import React from "react";
import Filter from "../components/Filter/Filter";
import {View} from "react-native";
import SortComponent from "../components/SortComponent";

const Stack = createNativeStackNavigator();

const SearchNavigator = ({navigation}) => {
    const filterParams = {searchRadius: 1, types: [], categories: []};

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Angebote"
                component={Screens.SearchScreen}
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
export default SearchNavigator;

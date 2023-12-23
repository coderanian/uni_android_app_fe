import {createNativeStackNavigator} from "@react-navigation/native-stack";
import * as Screens from "../screens";
import Ionicons from "react-native-vector-icons/Ionicons";
import {commonStyles} from "../assets/styles/commonStyles";
import * as React from "react";
import {Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger} from "react-native-popup-menu";

const Stack = createNativeStackNavigator();

const SearchNavigator = ({navigation}) => {
    return (
        <MenuProvider>
        <Stack.Navigator>
            <Stack.Screen
                name="Angebote"
                component={Screens.SearchScreen}
                options={{
                    headerRight: () => (
                        <Menu>
                            <MenuTrigger>
                                <Ionicons name="md-arrow-down" style={commonStyles.standardIcon}/>
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => console.log('TEsst')} text="Filter Option 1" />
                                <MenuOption onSelect={() => console.log('TEsst')} text="Filter Option 2" />
                                {/* Weitere Menüoptionen hier hinzufügen */}
                            </MenuOptions>
                        </Menu>


                    )
                }}
            />
            <Stack.Screen name={"Angebotdetails"} component={Screens.SearchDetailScreen}/>
        </Stack.Navigator>
        </MenuProvider>
    )
}
export default SearchNavigator;

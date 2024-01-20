import * as React from "react";
import * as Screens from "../screens/profile";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const ProfileNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profil" component={TabNavigator} />
        </Stack.Navigator>
    )
}
const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Übersicht">
            <Tab.Screen name="Übersicht" component={Screens.ProfileScreen}></Tab.Screen>
            <Tab.Screen name="Profil bearbeiten" component={Screens.EditProfileScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default ProfileNavigator;
import * as React from "react";
import {Alert, TouchableOpacity} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {DrawerActions,} from '@react-navigation/native';
import * as Screens from "../screens/profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import {commonStyles} from "../assets/styles/commonStyles";
import {useAuth} from "../context/AuthContext";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import AuthorInformation from "../screens/details/components/AuthorInformation";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

/*
 * Customizes drawer list with button for logout
 * It's not a route, it has to be defined outside of screens
 * @param props screens to show and route in drawer defined in DrawerNavigation
 * @returns {Element}


const DrawerContent = (props) => {
    const {onLogout} = useAuth();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}
            />
            <DrawerItem
                label="Ausloggen"
                onPress={() => {
                    onLogout();
                    Alert.alert("Login","Du wurdest ausgeloggt.")
                }}
            />
        </DrawerContentScrollView>
    )
}
*/
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
/*
const Drawer = createDrawerNavigator();
const ProfileNavigator = () => {
    //Avoid double delcaration, navigator named as "Mein Profil", actual screen "Profil"
    return (
        <Drawer.Navigator
            initialRouteName="Profil"
            screenOptions={{
                drawerPosition: 'right',
                headerStyle: commonStyles.navHeader
            }}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Profil"
                component={Screens.ProfileScreen}
                options={({navigation}) => ({
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.dispatch(DrawerActions.openDrawer());
                            }}
                        >
                            <Ionicons
                                name="md-settings-outline"
                                style={[
                                    commonStyles.standardIcon,]}
                            />
                        </TouchableOpacity>
                    ),
                    //Forse the button in drawer to be invisible
                    drawerItemStyle: {height: 0},
                    headerLeft: false,
                })}
            />
            <Drawer.Screen
                name="Profil bearbeiten"
                component={Screens.EditProfileScreen}
                options={{
                    headerLeft: false,
                }}
            />
        </Drawer.Navigator>
    )
}
*/

export default ProfileNavigator;
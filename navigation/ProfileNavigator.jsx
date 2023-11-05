import * as React from "react";
import {Alert, TouchableOpacity} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {DrawerActions,} from '@react-navigation/native';
import * as Screens from "../screens/profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import {commonStyles} from "../assets/styles/commonStyles";
import {useAuth} from "../context/AuthContext";

/**
 * Customizes drawer list with button for logout
 * It's not a route, it has to be defined outside of screens
 * @param props screens to show and route in drawer defined in DrawerNavigation
 * @returns {Element}
 * @author Konstantin K.
 */
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

const Drawer = createDrawerNavigator();
/**
 * Drawer navigation for user profile
 * Called via click on icon or swiping from left to right
 * @returns {Element}
 * @author Konstantin K.
 */
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

export default ProfileNavigator;
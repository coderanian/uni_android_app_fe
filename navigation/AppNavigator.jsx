import MainNavigator from './MainNavigator'
import AuthentificationNavigator from "./AuthentificationNavigator";
import {NavigationContainer} from "@react-navigation/native";
import LoadingMsg from "../components/LoadingMsg";
import React from "react";
import {AuthProvider, useAuth} from "../context/AuthContext";

/**
 * Needs to be child of wrapped main app to access AuthContext
 * @returns {Element}
 */
const AppNavigator = () => {
    const {authState, onLogout, isTokenLoaded} = useAuth();

    if(!isTokenLoaded){
        return <LoadingMsg/>
    }

    return (
        <NavigationContainer>
            {authState?.authenticated ? (
                <MainNavigator/>
            ) : (
                <AuthentificationNavigator/>
            )}
        </NavigationContainer>
    )
}

export default AppNavigator;
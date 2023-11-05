import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {apiUriFactory} from "../services/apiUriFactory";
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'jwt';
//Creates context object to pass data related to authentication throughout the component tree
const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

//Wraps app and provides context data and functions related to authentication
export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
    });
    //For LoadingMsg rendering while token is being retrieved from store
    const [isTokenLoaded, setIsTokenLoaded] = useState(false);

    //Retrieve token on app launch by defining authorization header
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("Stored token: ", token);
            if(token){
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true,
                })
            }
            setIsTokenLoaded(true);
        };
        loadToken();
    }, []);

    //Fetch response from registration post request
    const register = async (email, username, password) => {
        try {
            return await axios.post(apiUriFactory('register'), {email, username, password});
        } catch (e) {
            return {error: true, msg: e.response.data.msg};
        }
    };

    //Fetch response from login post request
    const login = async (email, password) => {
        try {
            const result = await axios.post(apiUriFactory('login'), {email, password});
            console.log('Login result: ', result);
            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            return result;
        } catch (e) {
            return {error: true, msg: e.response.data.msg};
        }
    }
    //Deletes token from storage, resets auth. state forcing login screen to render
    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            token: null,
            authenticated: false
        });
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState,
        isTokenLoaded
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {apiUriFactory} from "../services/apiUriFactory";
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'jwt';
//Creates context object to pass data related to authentication throughout the component tree
const AuthContext = createContext(null);

/**
 * Make storage available
 * @author Konstantin K.
 */
export const useAuth = () => {
    return useContext(AuthContext);
}

/**
 * Wraps app and provides context data and functions related to authentication
 * @author Konstantin K.
 */
export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null,
    });
    //For LoadingMsg rendering while token is being retrieved from store
    const [isTokenLoaded, setIsTokenLoaded] = useState(false);

    /**
     * Retrieve token on app launch by defining authorization header
     * @author Konstantin K.
     */
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            //console.log("Stored token: ", token);
            if (token) {
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

    /**
     * Fetch response from post request for registration
     * @param email input
     * @param name input
     * @param password input
     * @returns server response
     * @author Konstantin K.
     */
    const register = async (email, name, password) => {
        try {
            return await axios.post(
                apiUriFactory('register'),
                {email, name, password}
            );
        } catch (e) {
            console.log(e.response.data)
            return {error: true, status: e.response.status.toString(), msg: e.response.data};
        }
    };

    /**
     * Fetch profile data of user id
     * @returns server response
     * @author Konstantin K.
     */
    const getUser = async () => {
        try {
            return await axios.get(apiUriFactory("my-profile"))
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data};
        }
    };

    /**
     * Update profile data of user id
     * @returns server response
     * @author Konstantin K.
     */
    const putUser = async (name, email, password, picture, location) => {
        try {
            //let user = await SecureStore.getItemAsync(USER_ID_KEY);
            return await axios.put(apiUriFactory(
                "my-profile"),
                {name, email, password, picture, location}
            );
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    /**
     * Fetch offer count of user id
     * @returns server response
     * @author Konstantin K.
     */
    const getUserOfferCnt = async () => {
        try {
            return await axios.get(apiUriFactory("my-profile/offer-count"));
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }

    }

    /**
     * Fetch response from login post request
     * @param email input
     * @param password input
     * @returns server response
     * @author Konstantin K.
     */
    const login = async (email, password) => {
        try {
            const result = await axios.post(apiUriFactory('login'), {email, password});
            //console.log('Login result: ', result.data.id);
            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            //Only string can be stored
            //await SecureStore.setItemAsync(USER_ID_KEY, result.data.id.toString());
            return result;
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data};
        }
    }

    /**
     * Deletes token from storage, resets auth. state forcing login screen to render
     * @returns {Promise<void>}
     * @author Konstantin K.
     */
    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            token: null,
            authenticated: false
        });
    }

    /**
     * Make functions for server communication available in app
     */
    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onGetUser: getUser,
        onPutUser: putUser,
        onGetOfferCnt: getUserOfferCnt,
        authState,
        isTokenLoaded
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

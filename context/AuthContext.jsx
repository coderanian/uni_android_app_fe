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
            return await axios.get(apiUriFactory("profile"))
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data};
        }
    };

    /**
     * Update profile data of user id
     * @returns server response
     * @author Konstantin K.
     */
    const putUser = async (name, email, newPassword, picture, location) => {
        try {
            return await axios.put(apiUriFactory(
                "profile"),
                {name, email, newPassword, picture, location}
            );
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
            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
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
     * Sends post request with offer details for new offer
     * @returns {Promise<void>}
     * @author Konstantin K.
     */
    const postOffer = async (
        title, description, category, quantity, priceType, price, productPic
    ) => {
        try {
            console.log("test");
            return await axios.post(apiUriFactory(
                    "offers"),
                {title, description, category, quantity, priceType, price, productPic}
            );
        } catch (e) {
            console.log(e);
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    /**
     * Sends put request with offer details for new offer
     * @returns {Promise<void>}
     * @author Konstantin K.
     */
    const putOffer = async (
        offerId, title, description, category, quantity, priceType, price, productPic
    ) => {
        try {
            return await axios.put(apiUriFactory(
                    `offers/${offerId}`),
                {title, description, category, quantity, priceType, price, productPic}
            );
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    /**
     * Sends delete request with for existing offer
     * @returns {Promise<void>}
     * @author Konstantin K.
     */
    const deleteOffer = async (offerId, sold) => {
        try {
            return await axios.delete(
                apiUriFactory(`offers/${offerId}`),
                {params: {sold: sold}}
            );
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    /**
     * Retrieves array of offers created by the user
     * @returns {Promise<void>}
     * @author Konstantin K.
     */
    const getMyOffers = async() => {
        try {
            return await axios.get(apiUriFactory("offers/my-offers"));
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    const getOffers = async (location) => {
        try {
            return await axios.get(apiUriFactory("offers"), { params: { lat: location.latitude, lon: location.longitude, radius: 1.0 } });
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    const reserveOffer = async (offerId) => {
        try {
            return await axios.post(apiUriFactory(`reservations/${offerId}`));
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    const cancelReservation = async (reservationId) => {
        try {
            return await axios.put(apiUriFactory(`reservations/${reservationId}/unreserve`));
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
    }

    const getReservationList = async () => {
        try {
            return await axios.get(apiUriFactory("reservations"));
        } catch (e) {
            return {error: true, status: e.response.status.toString(), msg: e.response.data.error};
        }
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
        onPostOffer: postOffer,
        onGetMyOffers: getMyOffers,
        onPutOffer: putOffer,
        onDeleteOffer: deleteOffer,
        onGetOffers: getOffers,
        onReserveOffer: reserveOffer,
        onCancelReservation: cancelReservation,
        onGetReservationList: getReservationList,
        authState,
        isTokenLoaded
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    };

    const hideSnackbar = () => {
        setSnackbarVisible(false);
        setSnackbarMessage('');
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
            {children}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={hideSnackbar}
                duration={2000}
                action={{ label: 'OK', onPress: hideSnackbar }}
            >
                {snackbarMessage}
            </Snackbar>
        </SnackbarContext.Provider>
    )
};

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};
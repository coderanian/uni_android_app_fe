import React from "react";
import {AuthProvider} from "./context/AuthContext";
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from "./navigation/AppNavigator";
import {SnackbarProvider} from "./context/SnackbarContext";

function App() {
    return (
        <PaperProvider>
            <SnackbarProvider>
                <AuthProvider>
                    <AppNavigator/>
                </AuthProvider>
            </SnackbarProvider>
        </PaperProvider>
    )
}

export default App;
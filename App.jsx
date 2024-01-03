import React from "react";
import {AuthProvider} from "./context/AuthContext";
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from "./navigation/AppNavigator";

function App() {
    return (
        <PaperProvider>
            <AuthProvider>
                <AppNavigator/>
            </AuthProvider>
        </PaperProvider>
    )
}

export default App;
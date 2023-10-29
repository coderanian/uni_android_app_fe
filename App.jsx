import React, {useCallback, useContext, useEffect, useState} from "react";
import {AuthProvider} from "./context/AuthContext";
import AppNavigator from "./navigation/AppNavigator";

function App() {
    return (
        <AuthProvider>
            <AppNavigator/>
        </AuthProvider>
    )
}

export default App;
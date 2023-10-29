import * as Navigators from './navigation/index'
import {NavigationContainer} from "@react-navigation/native";
import LoadingMsg from "./components/LoadingMsg";
import React, {useState} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    //tbu. with proper token authorization, taken from react-navigation docu for test
    const getUserToken = async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        try {
            await sleep(2000);
            const token = null;
            setUserToken(token);
        } finally {
            setIsLoading(false);
        }
    };
    React.useEffect(() => {
        getUserToken();
    }, []);

    if (isLoading) {
        return <LoadingMsg/>
    }

    return (
        <NavigationContainer>
            {userToken ? (
                <Navigators.MainNavigator/>
            ) : (
                <Navigators.AuthentificationNavigator setUserToken={setUserToken}/>
            )}
        </NavigationContainer>
    )
}

export default App;
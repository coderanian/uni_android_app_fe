import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {authentificationStyles, profileStyles, stockStyles} from "../../assets/styles/commonStyles";
import {useAuth} from "../../context/AuthContext";
import LoadingMsg from "../../components/LoadingMsg";
import MyOffer from "../../components/Offer/MyOffer";

const StockScreen = ({navigation}) => {
    const {onGetMyOffers, onLogout} = useAuth();
    const [offerList, setOfferList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const loadMyOffers = async () => {
                const result = await onGetMyOffers();
                if (result && result.error) {
                    if (['403', '500'].includes(result.status.toString())) {
                        onLogout();
                        Alert.alert("Login", "Login abgelaufen.")
                    } else if(result.status.toString() === '406'){
                        navigation.navigate("Mein Profil");
                        Alert.alert("Fehler", "Standort im Profil nicht gesetzt!");
                    } else {
                        Alert.alert(result.status, result.msg);
                    }
                } else {
                    setOfferList(result.data);
                    setIsLoading(false);
                }
            };
            //GET request on initial screen mount
            loadMyOffers();
        })
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={profileStyles.container}>
            {isLoading
                ? <LoadingMsg/>
                : (offerList && offerList.length === 0
                        ? (<Text>Noch kein Angebot erstellt!</Text>)
                        : (
                            <ScrollView>
                                {offerList.map((item) =>(
                                    <MyOffer
                                        key={item.offerId}
                                        offer={item}
                                        navigation={navigation}
                                    />
                                ))}
                            </ScrollView>
                        )
                )
            }
            <View style={stockStyles.btnContainer}>
                <TouchableOpacity
                    style={stockStyles.button}
                    onPress={() => navigation.navigate('Neues Angebot')}
                >
                    <Text style={authentificationStyles.buttonText}>Neues Angebot</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StockScreen;
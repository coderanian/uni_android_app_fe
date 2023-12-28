import {Alert, ScrollView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {profileStyles} from "../../assets/styles/commonStyles";
import LoadingMsg from "../../components/LoadingMsg";
import Offer from "../../components/Offer/Offer";
import {accessLocation} from "../../services/accessLocation";

const SearchScreen = ({navigation}) => {
    const {onGetOffers, onLogout} = useAuth();
    const [offerList, setOfferList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const loadOffers = async () => {
                const location = await accessLocation();
                const result = await onGetOffers(location);
                if (result && result.error) {
                    if (['403', '500'].includes(result.status.toString())) {
                        onLogout();
                        Alert.alert(result)
                    } else {
                        Alert.alert(result.status, result.msg);
                    }
                } else {
                    setOfferList(result.data);
                    setIsLoading(false);
                }
            };
            //GET request on initial screen mount
            loadOffers();
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
                                    <Offer
                                        key={item.offerId}
                                        offer={item}
                                        navigation={navigation}
                                    />
                                ))}
                            </ScrollView>
                        )
                )
            }
        </View>
    )
}

export default SearchScreen;
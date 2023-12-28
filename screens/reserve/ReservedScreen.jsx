import {Alert, ScrollView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {profileStyles} from "../../assets/styles/commonStyles";
import LoadingMsg from "../../components/LoadingMsg";
import Offer from "../../components/Offer/Offer";

const ReservedScreen = ({navigation}) => {
    const {onGetReservationList, onLogout} = useAuth();
    const [offerList, setOfferList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleCancelReservation = (item) => {
        const updatedList = offerList.filter((data) => data !== item);
        setOfferList(updatedList);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const loadReservations = async () => {
                const result = await onGetReservationList();
                if (result && result.error) {
                    if (['403', '500'].includes(result.status.toString())) {
                        onLogout();
                        Alert.alert("Login", "Login abgelaufen.")
                    } else {
                        Alert.alert(result.status, result.msg);
                    }
                } else {
                    setOfferList(result.data);
                    setIsLoading(false);
                }
            };
            //GET request on initial screen mount
            loadReservations();
        })
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={profileStyles.container}>
            {isLoading
                ? <LoadingMsg/>
                : (offerList && offerList.length === 0
                        ? (<Text>Noch kein Reservierung vorhanden!</Text>)
                        : (
                            <ScrollView>
                                {offerList.map((item) =>(
                                    <Offer
                                        key={item.offerId}
                                        offer={item}
                                        navigation={navigation}
                                        onCancel={handleCancelReservation}
                                    />
                                ))}
                            </ScrollView>
                        )
                )
            }
        </View>
    )
}

export default ReservedScreen;
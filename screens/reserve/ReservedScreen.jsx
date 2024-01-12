import {Alert, ScrollView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {profileStyles} from "../../assets/styles/commonStyles";
import LoadingMsg from "../../components/LoadingMsg";
import Offer from "../../components/Offer/Offer";
import EmptyState from "../../components/EmptyState";
import {useNavigation, useRoute} from "@react-navigation/native";
import {sortByAttribute} from "../../utils/sortUtil";

const ReservedScreen = () => {
    const {onGetReservationList, onLogout} = useAuth();
    const [offerList, setOfferList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();
    const route = useRoute();
    let {filterParams, sortOptions} = route.params;

    const handleCancelReservation = (item) => {
        const updatedList = offerList.filter((data) => data !== item);
        setOfferList(updatedList);
    };

    useEffect(() => {
        // GET request on filter change
        if (!!filterParams) {
            loadReservations();
        }
    }, [filterParams]);

    useEffect(() => {
        if (!!sortOptions) {
            const sortedArray = sortByAttribute(offerList, sortOptions.sortBy, sortOptions.direction);
            setOfferList(sortedArray);
        }
    }, [sortOptions]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            //GET request on initial screen mount
            loadReservations();
        })
        return unsubscribe;
    }, [navigation]);

    const loadReservations = async () => {
        const result = await onGetReservationList(filterParams);
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

    return (
        <View style={profileStyles.container}>
            {isLoading
                ? <LoadingMsg/>
                : (offerList && offerList.length === 0
                        ? (<EmptyState message={"Noch keine Reservierung vorhanden"}></EmptyState>)
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
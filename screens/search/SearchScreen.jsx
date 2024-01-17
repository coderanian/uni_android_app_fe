import {Alert, ScrollView, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {profileStyles} from "../../assets/styles/commonStyles";
import LoadingMsg from "../../components/LoadingMsg";
import Offer from "../../components/Offer/Offer";
import {accessLocation} from "../../services/accessLocation";
import EmptyState from "../../components/EmptyState";
import {useNavigation, useRoute} from "@react-navigation/native";
import {sortByAttribute} from "../../utils/sortUtil";

const SearchScreen = () => {
    const {onGetOffers, onLogout} = useAuth();
    const [offerList, setOfferList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(null);

    const navigation = useNavigation();
    const route = useRoute();
    let {filterParams, sortOptions} = route.params;


    useEffect(() => {
        // GET request on filter change
        if (!!filterParams) {
            loadOffers();
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
            if (!!filterParams) {
                loadOffers();
            }
        })
        return unsubscribe;
    }, [navigation]);

    const loadOffers = async () => {
        const location = await accessLocation();
        const result = await onGetOffers(location, filterParams);
        if (result && result.error) {
            if (['403', '500'].includes(result.status.toString())) {
                onLogout();
                Alert.alert(result);
            } else if (result.status.toString() === '406') {
                setOfferList([]);
                setIsLoading(false);
            }
            else {
                Alert.alert(result.status, result.msg);
            }
        } else {
            setOfferList(result.data);
            setIsLoading(false);
        }
    };

    const handleCancelReservation = (item) => {
        console.log('Reservation cancelled');
    };


    return (
        <View style={profileStyles.container}>
            {isLoading
                ? <LoadingMsg/>
                : (offerList && offerList.length === 0
                        ? (<EmptyState message={"Keine Angebote in der Nähe"}></EmptyState>)
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

export default SearchScreen;
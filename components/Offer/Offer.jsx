import {View, Text, Image, Alert, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {offerStyle} from "../../assets/styles/offerStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import {useAuth} from "../../context/AuthContext";
import {calcTime} from "../../utils/calcTime";
import {profileStyles, searchStyles} from "../../assets/styles/commonStyles";
import MapView, {Marker} from "react-native-maps";

/**
 * Element of offer list
 * @param text - Text to show to the right of checkbox
 * @returns {Element}
 * @author Konstantin K.
 */
const Offer = ({offer, navigation, onCancel}) => {
    const {onReserveOffer, onCancelReservation, onLogout} = useAuth();
    const [remainingTime, setRemainingTime] = useState(calcTime(offer.reservation?.reservationTimestamp ?? null));
    const [locationView, setLocationView] = useState(false);
    const [region, setRegion] = useState(offer.location);

    const reserveOffer = async () => {
        const result = await onReserveOffer(offer.offerId);
        if(result && result.error){
            if (result.status.toString() === '403') {
                onLogout();
                Alert.alert("Login","Login abgelaufen.")
            }else{
                Alert.alert(result.status, result.msg);
            }
        } else {
            offer.reservation = result.data;
            setRemainingTime(calcTime(result.data.reservationTimestamp));
        }
    }

    const cancelReservation = async () => {
        const result = await onCancelReservation(offer.reservation.reservationId);
        if(result && result.error){
            if (result.status.toString() === '403') {
                onLogout();
                Alert.alert("Login","Login abgelaufen.")
            }else{
                Alert.alert(result.status, result.msg);
            }
        } else {
            onCancel(offer)
        }
    }

    const toggleLocationView = () => {
        setLocationView(!locationView);
    }


    useEffect(() => {
        if (offer.reservation) {
            const interval = setInterval(() => {
                setRemainingTime(calcTime(offer.reservation.reservationTimestamp));
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [offer.reservation]);

    return (
        <MenuProvider skipInstanceCheck>
            <View style={offerStyle.container}>
                <View style={offerStyle.innercontainer}>
                    {offer.productPic ? (
                        <Image style={offerStyle.img} source={{uri: offer.productPic}}/>
                    ) : (
                        <View style={offerStyle.imgTemplate}/>
                    )}
                    <View style={offerStyle.textContainer}>
                        <Text style={offerStyle.title}>{offer.title}</Text>
                        <Text style={offerStyle.text}>Kategorie: {offer.category}</Text>
                        <Text style={offerStyle.text}>Preis: {offer.priceType !== 'TRADE' ? offer.price + " €" : offer.price}</Text>
                        <Text style={offerStyle.text}>Anbieter: {offer.author.name}</Text>
                    </View>

                </View>
                {
                    offer.reservation ? (
                        <View>
                            <View style={offerStyle.statusContainer}>
                                <Ionicons
                                    name="md-alarm"
                                    style={offerStyle.statusIconReserved}
                                />
                                <Text>{`Reserviert (${remainingTime} Min. übrig)`}</Text>
                            </View>
                            <TouchableOpacity
                                style={searchStyles.buttoncancel}
                                onPress={cancelReservation}
                                underlayColor='#fff'>
                                <Text style={searchStyles.buttonText}>Cancel Reservieren</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={searchStyles.button}
                            onPress={reserveOffer}
                            underlayColor='#fff'>
                            <Text style={searchStyles.buttonText}>Reservieren</Text>
                        </TouchableOpacity>
                    )

                }


            </View>
            <View style={searchStyles.iconContainer}>
                <Ionicons
                    name="md-eye"
                    style={searchStyles.btnDetails}
                    onPress={() => navigation.navigate("Angebotdetails", {offer})}
                />
                <Ionicons
                    name="md-map"
                    style={searchStyles.btnDetails}
                    onPress={toggleLocationView}
                />
            </View>

            {
                locationView ?
                    (<MapView
                        style={profileStyles.mapContainer}
                        region={region}
                    >
                        <Marker
                            coordinate={{
                                latitude: offer.location.latitude,
                                longitude: offer.location.longitude,
                            }}
                        />
                    </MapView>) : ""
            }

        </MenuProvider>
    )
}

export default Offer;

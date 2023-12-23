import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {calcTime} from "../../utils/calcTime";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {offerStyle} from "../../assets/styles/offerStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import {searchStyles} from "../../assets/styles/commonStyles";

const ReservationButton = ({offer, onCancel}) => {
    const {onReserveOffer, onCancelReservation} = useAuth();
    const [remainingTime, setRemainingTime] = useState(calcTime(offer.reservation?.reservationTimestamp ?? null));

    const reserveOffer = async () => {
        const result = await onReserveOffer(offer.offerId);
        if(result && result.error){
            if (result.status.toString() === '403') {
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
                Alert.alert("Login","Login abgelaufen.")
            }else{
                Alert.alert(result.status, result.msg);
            }
        } else {
            onCancel(offer)
        }
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
        offer.reservation ? <View>
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
            </View> : <TouchableOpacity
                style={searchStyles.button}
                onPress={reserveOffer}
                underlayColor='#fff'>
                <Text style={searchStyles.buttonText}>Reservieren</Text>
            </TouchableOpacity>

    )
};
export default ReservationButton;
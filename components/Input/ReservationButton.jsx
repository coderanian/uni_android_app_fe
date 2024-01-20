import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {calcTime} from "../../utils/calcTime";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import {offerStyle} from "../../assets/styles/offerStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import {searchStyles} from "../../assets/styles/commonStyles";
import {useSnackbar} from "../../context/SnackbarContext";

const ReservationButton = ({offer, onCancel}) => {
    const {onReserveOffer, onCancelReservation, onLogout} = useAuth();
    const { showSnackbar } = useSnackbar();
    const [remainingTime, setRemainingTime] = useState(calcTime(offer.reservation?.reservationTimestamp ?? null));

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
            showSnackbar("Angebot wurde reserviert");
        }
    }

    const cancelReservation = async () => {
        const result = await onCancelReservation(offer.reservation.reservationId);
        if(result && result.error){
            if (result.status.toString() === '403') {
                onLogout();
                Alert.alert("Login","Login abgelaufen.")
            } else{
                Alert.alert(result.status, result.msg);
            }
        } else {
            offer.reservation.reservationTimestamp = new Date().toISOString();
            setRemainingTime(offer.reservation.reservationTimestamp);
            showSnackbar("Reservierung wurde storniert");
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
        offer.reservation && remainingTime > 0 ? <View>
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
                    <Text style={searchStyles.buttonText}>Reservierung stornieren</Text>
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
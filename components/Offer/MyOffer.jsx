import {View, Text, Image, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {offerStyle} from "../../assets/styles/offerStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider} from 'react-native-popup-menu';
import {useAuth} from "../../context/AuthContext";
import {calcTime} from "../../utils/calcTime";
import {offerCategories} from '../../utils/constants'
import {findOfferTypeKey} from "../../utils/offerTranslation";

/**
 * Element of offer list
 * @param text - Text to show to the right of checkbox
 * @returns {Element}
 */
const MyOffer = ({offer, navigation}) => {
    const {onDeleteOffer, onLogout} = useAuth();
    const [remainingTime, setRemainingTime] = useState(calcTime(offer.reservationEnd));

    const deleteOffer = async () => {
        let sold = !!offer.reservedBy;
        const result = await onDeleteOffer(offer.offerId, sold);
        if(result && result.error){
            if (result.status.toString() === '403') {
                onLogout();
                Alert.alert("Login","Login abgelaufen.")
            }else{
                Alert.alert(result.status, result.msg);
            }
        } else {
            navigation.goBack();
            Alert.alert("Angebot", `Angebot erfolgreich ${sold ? "verkauft" : "gelöscht"}!`)
        }
    }

    const handlePopupSelect = (val) => {
        switch (val) {
            case 'details':
                navigation.navigate("Angebot Details", {offer});
                break;
            case 'edit':
                navigation.navigate("Angebot Bearbeiten", {offer});
                break;
            case 'delete':
                deleteOffer();
                break;
            default:
                console.log("Unknown element!")
        }
    }

    useEffect(() => {
        if (offer.reservationEnd) {
            const interval = setInterval(() => {
                setRemainingTime(calcTime(offer.reservationEnd));
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [offer.reservationEnd]);

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
                        <Text style={offerStyle.text}>Kategorie: {findOfferTypeKey(offer.category)}</Text>
                        <Text
                            style={offerStyle.text}>Preis: {offer.priceType !== 'TRADE' ? offer.price + " €" : offer.price}</Text>
                        {(offer.reservationEnd && remainingTime > 0) ? (
                            <View style={offerStyle.statusContainer}>
                                <Ionicons
                                    name="md-alarm"
                                    style={offerStyle.statusIconReserved}
                                />
                                <Text>{`Reserviert (${remainingTime} Min. übrig)`}</Text>
                            </View>
                        ) : (
                            <View style={offerStyle.statusContainer}>
                                <Ionicons
                                    style={offerStyle.statusIconAvailable}
                                    name="md-checkmark-circle"
                                />
                                <Text>Verfügbar</Text>
                            </View>
                        )}
                    </View>

                </View>
            </View>
            <Menu style={offerStyle.btn}>
                <MenuTrigger>
                    <Ionicons
                        name="md-ellipsis-vertical"
                        style={offerStyle.btnIcon}
                    />
                </MenuTrigger>
                <MenuOptions style={offerStyle.menu}>
                    <MenuOption
                        style={offerStyle.menuItem}
                        onSelect={() => handlePopupSelect("details")}
                        text={"Angebot ansehen"}
                    />
                    <MenuOption
                        style={offerStyle.menuItem}
                        onSelect={() => handlePopupSelect("edit")}
                        text={"Angebot bearbeiten"}
                    />
                    <MenuOption
                        style={offerStyle.menuItem}
                        onSelect={() => handlePopupSelect("delete")}
                        text={`Angebot ${remainingTime > 0 ? "verkaufen" : "löschen"}`}
                    />
                </MenuOptions>
            </Menu>
        </MenuProvider>
    )
}

export default MyOffer;

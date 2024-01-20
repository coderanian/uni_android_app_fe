import {View, Text, Image} from "react-native";
import React, {useEffect, useState} from "react";
import {offerStyle} from "../../assets/styles/offerStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import {MenuProvider} from 'react-native-popup-menu';
import {searchStyles} from "../../assets/styles/commonStyles";
import MapComponent from "../MapComponent";
import ReservationButton from "../Input/ReservationButton";
import {findOfferTypeKey} from "../../utils/offerTranslation";
import PlaceholderImage from "../../assets/images/no_pic.png";

/**
 * Element of offer list
 * @param text - Text to show to the right of checkbox
 * @returns {Element}
 * @author Konstantin K.
 */
const Offer = ({offer, navigation, onCancel}) => {
    const [locationView, setLocationView] = useState(false);

    const toggleLocationView = () => {
        setLocationView(!locationView);
    }


    return (
        <MenuProvider skipInstanceCheck>
            <View style={offerStyle.container}>
                <View style={offerStyle.innercontainer}>
                    {offer.productPic ? (
                        <Image style={offerStyle.img} source={{uri: offer.productPic}}/>
                    ) : (
                        <Image style={offerStyle.img} source={PlaceholderImage}/>
                    )}
                    <View style={offerStyle.textContainer}>
                        <Text style={offerStyle.title}>{offer.title}</Text>
                        <Text style={offerStyle.text}>Kategorie: {findOfferTypeKey(offer.category)}</Text>
                        <Text style={offerStyle.text}>Preis: {offer.priceType !== 'TRADE' ? offer.price + " €" : offer.price}</Text>
                        <Text style={offerStyle.text}>Anbieter: {offer.author.name}</Text>
                    </View>

                </View>
                <ReservationButton offer={offer} onCancel={() => onCancel(offer)}></ReservationButton>


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
                    (<MapComponent location={offer.location}></MapComponent>) : ""
            }

        </MenuProvider>
    )
}

export default Offer;

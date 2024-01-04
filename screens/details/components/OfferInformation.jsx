import React from "react";
import {ScrollView, Text, View} from "react-native";
import {profileStyles, stockStyles} from "../../../assets/styles/commonStyles";
import ReservationButton from "../../../components/Input/ReservationButton";

const OfferInformation = ({route}) => {
    const offer = route.params;

    return (
        <ScrollView style={profileStyles.body}>
            {offer.productPic ? (
                <Image style={stockStyles.imgTemplate} source={{uri: offer.productPic}}/>
            ) : (
                <View style={stockStyles.imgTemplate}/>
            )}
            <View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Title</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.title}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Kategorie</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.category}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Quantität</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.quantity}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Art des Angebots</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.priceType}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Preis</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.priceType === "TRADE" ? offer.price : offer.price + " €"}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Beschreibung</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.description}
                    </Text>
                </View>
            </View>

            <ReservationButton offer={offer}></ReservationButton>
        </ScrollView>
    )
};
export default OfferInformation;
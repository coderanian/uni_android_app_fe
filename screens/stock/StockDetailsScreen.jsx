import React from "react";
import {View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import {authentificationStyles, profileStyles, stockStyles} from "../../assets/styles/commonStyles";

const StockDetailsScreen = ({navigation, route}) => {
    const {offer} = route.params;
    const goToEdit = () => {
        navigation.navigate("Angebot Bearbeiten", {offer})
    }

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
                    <Text>Preis</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.description}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={authentificationStyles.button} onPress={goToEdit}>
                <Text style={authentificationStyles.buttonText}>Angebot bearbeiten</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default StockDetailsScreen;

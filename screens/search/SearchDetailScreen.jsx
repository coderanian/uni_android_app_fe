import React from "react";

import {Image, ScrollView, Text, View} from "react-native";
import {Divider} from "react-native-paper";
import {profileStyles, stockStyles} from "../../assets/styles/commonStyles";
import ReservationButton from "../../components/Input/ReservationButton";
import AuthorInformation from "../details/components/AuthorInformation";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const SearchDetailScreen = ({navigation, route}) => {
    const {offer} = route.params;

    return (
        /*<ScrollView style={profileStyles.body}>*/
            <Tab.Navigator>
                <Tab.Screen name="Anbieter" component={AuthorInformation} initialParams={{author: offer.author}}></Tab.Screen>
            </Tab.Navigator>



            /*{offer.productPic ? (
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

            <Divider />

          {/!*  <AuthorInformation author={offer.author}></AuthorInformation>*!/}

            <ReservationButton offer={offer}></ReservationButton>
        </ScrollView>*/
    )
}
export default SearchDetailScreen;
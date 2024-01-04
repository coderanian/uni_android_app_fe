import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AuthorInformation, OfferInformation, LocationInformation } from "./components";

const Tab = createMaterialTopTabNavigator();
const DetailsScreen = ({route}) => {
    const {offer} = route.params;

    return (
        <Tab.Navigator>
            <Tab.Screen name="Details" component={OfferInformation} initialParams={offer}></Tab.Screen>
            <Tab.Screen name="Anbieter" component={AuthorInformation} initialParams={{author: offer.author}}></Tab.Screen>
            <Tab.Screen name="Standort" component={LocationInformation} initialParams={{location: offer.location}}></Tab.Screen>
        </Tab.Navigator>
    )
};
export default DetailsScreen;
import React, {useEffect, useState} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {EditProfileScreen, ProfileScreen} from "../profile";
import {Text} from "react-native";

const Tab = createMaterialTopTabNavigator();

const SearchDetailScreen = ({navigation}) => {

    return (
        <View>
        <Text>DetailScreen works</Text>
        </View>
    );

}
export default SearchDetailScreen;
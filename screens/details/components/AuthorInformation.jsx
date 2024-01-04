import React from "react";
import {View, Text, Image, ScrollView} from "react-native";
import {profileStyles} from "../../../assets/styles/commonStyles";
import defaultAvatar from "../../../assets/images/avatar_template.jpg";

const AuthorInformation = ({route}) => {
    const author = route.params.author;

    return (
        <ScrollView style={profileStyles.body}>
            <View style={profileStyles.headerContainer}>
                <View style={profileStyles.textContainer}>
                    <Text>Name</Text>
                    <Text style={profileStyles.propertyValue}>
                        {author.name}
                    </Text>
                    <Text>Verkaufte Artikel</Text>
                    <Text style={profileStyles.propertyValue}>
                        {author.transactions}
                    </Text>
                    <Text>Aktive Artikel</Text>
                    <Text style={profileStyles.propertyValue}>
                        {author.offersCount}
                    </Text>
                </View>
                <Image
                    style={profileStyles.imgContainer}
                    source={author.picture ? {uri: author.picture} : defaultAvatar}
                />
            </View>
        </ScrollView>
    )
};
export default AuthorInformation;
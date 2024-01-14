import React, {useEffect, useState} from "react";
import {View, Text, Image, ScrollView, Alert} from "react-native";
import {profileStyles, searchStyles} from "../../../assets/styles/commonStyles";
import defaultAvatar from "../../../assets/images/avatar_template.jpg";
import {useAuth} from "../../../context/AuthContext";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import LoadingMsg from "../../../components/LoadingMsg";
import {offerStyle} from "../../../assets/styles/offerStyle";
import Ionicons from "react-native-vector-icons/Ionicons";
import {MenuProvider} from "react-native-popup-menu";
import {findOfferTypeKey} from "../../../utils/offerTranslation";

const AuthorInformation = ({route}) => {
    const author = route.params.author;
    const navigation = useNavigation();
    const {onGetUserOffers, onLogout} = useAuth();
    const [offerList, setOfferList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadOffers();
        });
        return unsubscribe;
    }, [navigation]);

    const loadOffers = async () => {
        const result = await onGetUserOffers(route.params.author.id);
        if (result && result.error) {
            if (['403', '500'].includes(result.status.toString())) {
                onLogout();
                Alert.alert(result);
            } else {
                Alert.alert(result.status, result.msg);
            }
        } else {
            setOfferList(result.data);
            setIsLoading(false);
        }
    };

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
            {isLoading
                ? <LoadingMsg/>
                : (offerList.map((offer) =>(
                    <MenuProvider skipInstanceCheck key={offer.id}>
                        <View style={offerStyle.authorContainer} key={offer.id}>
                            <View style={offerStyle.innercontainer} key={offer.id}>
                                {offer.productPic ? (
                                    <Image style={offerStyle.img} source={{uri: offer.productPic}}/>
                                ) : (
                                    <View style={offerStyle.imgTemplate}/>
                                )}
                                <View style={offerStyle.textContainer}>
                                    <Text style={offerStyle.title}>{offer.title}</Text>
                                    <Text style={offerStyle.text}>Kategorie: {findOfferTypeKey(offer.category)}</Text>
                                    <Text style={offerStyle.text}>Preis: {offer.priceType !== 'TRADE' ? offer.price + " €" : offer.price}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={searchStyles.iconContainer}>
                            <Ionicons
                                name="md-eye"
                                style={searchStyles.btnDetails}
                                onPress={() => navigation.navigate("Details", {offer: offer})}
                            />
                        </View>
                    </MenuProvider>
                )))
            }
        </ScrollView>
    )
};
export default AuthorInformation;
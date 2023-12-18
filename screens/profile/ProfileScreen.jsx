import {ScrollView, Text, View, Image, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import LoadingMsg from "../../components/LoadingMsg";
import {profileStyles} from "../../assets/styles/commonStyles";
import MapView, {Marker} from 'react-native-maps';
import defaultAvatar from "../../assets/images/avatar_template.jpg";

const ProfileScreen = ({navigation}) => {
    const {onGetUser, onLogout} = useAuth(); // Access the getUser function and authState from the context
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [region, setRegion] = useState(null);


    //Retrieve user properties with token on screen focus / mounting
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const loadUser = async () => {
                const result = await onGetUser();
                if (result && result.error) {
                    if (['403', '500'].includes(result.status.toString())) {
                        onLogout();
                        Alert.alert("Login","Login abgelaufen.")
                    }else{
                        Alert.alert(result.status, result.msg);
                    }
                } else {
                    setUserData(result.data);
                    setIsLoading(false);
                }
            };
            //GET request on initial screen mount
            loadUser();
        })
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if(userData && userData.location){
            setRegion({
                latitude: userData.location.latitude,
                longitude: userData.location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }
        )}
    }, [userData])

    return (
        <View style={profileStyles.container}>
            {isLoading
                ? <LoadingMsg/>
                : (
                    <ScrollView style={profileStyles.body}>
                        <View style={profileStyles.headerContainer}>
                            <View style={profileStyles.textContainer}>
                                <Text>Transaktionen</Text>
                                <Text style={profileStyles.propertyValue}>
                                    {userData.transactions ?? 0}
                                </Text>
                                <Text>Aktive Angebote</Text>
                                <Text style={profileStyles.propertyValue}>
                                    {userData.offersCount}
                                </Text>
                            </View>
                            <Image
                                style={profileStyles.imgContainer}
                                source={userData.picture ? {uri: userData.picture} : defaultAvatar}
                            />
                        </View>
                        <View>
                            <View style={profileStyles.detailsContainer}>
                                <Text>Name</Text>
                                <Text style={profileStyles.propertyValue}>
                                    {userData.name}
                                </Text>
                            </View>
                            <View style={profileStyles.detailsContainer}>
                                <Text>Email</Text>
                                <Text style={profileStyles.propertyValue}>
                                    {userData.email}
                                </Text>
                            </View>
                            <View style={profileStyles.detailsContainer}>
                                <Text>Zelt-Standort</Text>
                                {!userData.location ? (
                                        <Text style={profileStyles.propertyValue}>Standort nicht gesetzt!</Text>
                                    ) : (
                                        <MapView
                                            style={profileStyles.mapContainer}
                                            region={region}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: userData.location.latitude,
                                                    longitude: userData.location.longitude,
                                                }}
                                            />
                                        </MapView>
                                    )
                                }
                            </View>
                        </View>
                    </ScrollView>
                )

            }
        </View>
    )
}

export default ProfileScreen;
import {ScrollView, Text, View, Image, TouchableOpacity, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import LoadingMsg from "../../components/LoadingMsg";
import {authentificationStyles, profileStyles} from "../../assets/styles/commonStyles";
import MapView, {Marker} from 'react-native-maps';
import CustomTextInput from "../../components/Input/CustomTextInput";
import PasswordInput from "../../components/Input/PasswordInput";
import {accessLocation} from "../../services/accessLocation";
import {accessCamera} from "../../services/accessCamera";
import defaultAvatar from '../../assets/images/avatar_template.jpg'

/**
 * Prefills input data with my-profile response
 * If input fields are left empty, put request is done with current profile details
 * Meaning that if only location has been updated other fields would be overwritten in BE with same values
 *
 * @param navigation
 * @returns {Element}
 * @constructor
 */
const EditProfileScreen = ({navigation}) => {
    const {onGetUser, onLogout, onPutUser} = useAuth();
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    //Input form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //Input from native phone functionality
    const [picture, setPicture] = useState(null)
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState(null)

    /*
    Unfortunately as of now I found no proper way of passing props between Drawer.Screen
    Only way to access userData and prefill inputs is either executing get request again or cachin userData globally
    Both are bad solutions, so I go with redundant core as it reduces overall app complexity
     */
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
    }, []);

    useEffect(() => {
        setName(userData.name);
        setEmail(userData.email);
        setPassword(userData.password)
        setPicture(userData.picture);
        setLocation(userData.location);
    }, [userData]);

    //Update region state each time location is updated
    useEffect(() => {
        if(location) {
            setRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            })
        }
    }, [location]);

    const update = async () => {
        const result = await onPutUser(name, email, password, picture, location);
        if (result && result.error) {
            Alert.alert(result.status, result.msg);
        } else {
            Alert.alert("Profil", "Änderungen wurden gespeichert!")
            navigation.goBack();
        }
    }

    /**
     * Ensure that location state is updated after fetching location
     */
    const updateLoc = async () => {
        try {
            const newLoc = await accessLocation();
            setLocation(newLoc);
        } catch (e) {
            Alert.alert("Fehler", e);
        }
    }

    /**
     * Ensure that picture state is updated after fetching location
     */
    const updatePic = async () => {
        try {
            const newPic = await accessCamera();
            setPicture(newPic)
        } catch (e) {
            Alert.alert("Fehler", e);
        }
    }

    return (
        <View style={profileStyles.container}>
            {isLoading
                ? <LoadingMsg/>
                : (
                    <ScrollView style={profileStyles.body}>
                        <Image
                            style={profileStyles.imgEditContainer}
                            source={picture ? {uri: picture} : defaultAvatar}
                        />
                        <TouchableOpacity
                            style={authentificationStyles.button}
                            onPress={updatePic}
                        >
                            <Text style={authentificationStyles.buttonText}>Bild hochladen</Text>
                        </TouchableOpacity>
                        <View>
                            <Text>Name</Text>
                            <CustomTextInput
                                placeholder={name}
                                mailInput={false}
                                onChangeInput={(input) => setName(input)}
                                edit={true}
                            />
                            <Text>Email</Text>
                            <CustomTextInput
                                placeholder={email}
                                mailInput={true}
                                onChangeInput={(input) => setEmail(input)}
                                edit={true}
                            />
                            <Text>Neues Passwort</Text>
                            <PasswordInput
                                onChangeInput={(input) => setPassword(input)}
                            />
                            <Text>Zelt-Standort</Text>
                            {location ? (
                                <MapView
                                    style={profileStyles.mapContainer}
                                    region={region}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: location.latitude,
                                            longitude: location.longitude,
                                        }}
                                    />
                                </MapView>
                            ) : (
                                <Text style={profileStyles.propertyValue}>
                                    Standort nicht gesetzt!
                                </Text>
                            )}

                            <TouchableOpacity
                                style={authentificationStyles.button}
                                onPress={updateLoc}
                            >
                                <Text style={authentificationStyles.buttonText}>Standort aktualisieren</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={authentificationStyles.button}
                                onPress={update}
                            >
                                <Text style={authentificationStyles.buttonText}>Änderungen speichern</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                )
            }
        </View>
    )
}

export default EditProfileScreen;